"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { AddressService } from "@/services/address-service";

interface Address {
  id: number;
  title: string;
  fullAddress: string;
  city: string;
  district: string;
  postalCode: string;
  phoneNumber?: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const { user, token } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    fullAddress: "",
    city: "",
    district: "",
    postalCode: "",
    phoneNumber: "",
    isDefault: false,
  });

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const addressService = new AddressService();
      const response = await addressService.getUserAddresses(token);

      if (response.data.success) {
        setAddresses(response.data.data);
      } else {
        console.error("Error fetching addresses:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      if (!/^\d{5}$/.test(formData.postalCode.trim())) {
        alert("Posta kodu 5 haneli olmalı.");
        return;
      }

      const addressService = new AddressService();
      if (editingAddress) {
        const response = await addressService.updateAddress(
          editingAddress.id,
          formData,
          token,
        );

        if (response.data.success) {
          setAddresses((prev) =>
            prev.map((addr) => {
              if (addr.id === editingAddress.id) return response.data.data;
              if (response.data.data.isDefault)
                return { ...addr, isDefault: false };
              return addr;
            }),
          );
        } else {
          console.error("Error updating address:", response.data.message);
          return;
        }
      } else {
        const response = await addressService.createAddress(formData, token);
        if (response.data.success) {
          setAddresses((prev) => {
            const next = response.data.data.isDefault
              ? prev.map((addr) => ({ ...addr, isDefault: false }))
              : prev;
            return [...next, response.data.data];
          });
        } else {
          console.error("Error creating address:", response.data.message);
          return;
        }
      }

      setShowAddForm(false);
      setEditingAddress(null);
      setFormData({
        title: "",
        fullAddress: "",
        city: "",
        district: "",
        postalCode: "",
        phoneNumber: "",
        isDefault: false,
      });
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      title: address.title,
      fullAddress: address.fullAddress,
      city: address.city,
      district: address.district,
      postalCode: address.postalCode,
      phoneNumber: address.phoneNumber || "",
      isDefault: address.isDefault,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bu adresi silmek istediğinizden emin misiniz?")) {
      try {
        if (!token) {
          console.error("No authentication token found");
          return;
        }
        const addressService = new AddressService();
        const response = await addressService.deleteAddress(id, token);
        if (response.data.success) {
          setAddresses((prev) => prev.filter((addr) => addr.id !== id));
        } else {
          console.error("Error deleting address:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      const addressService = new AddressService();
      const response = await addressService.setDefaultAddress(id, token);
      if (response.data.success) {
        setAddresses((prev) =>
          prev.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          })),
        );
      } else {
        console.error("Error setting default address:", response.data.message);
      }
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Giriş Yapın</h2>
          <p className="text-muted-foreground mb-6">
            Adreslerinizi yönetmek için giriş yapmanız gerekiyor.
          </p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Adreslerim</h1>
          <p className="text-muted-foreground mt-2">
            Teslimat adreslerinizi buradan yönetebilirsiniz.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {editingAddress ? "Adresi Düzenle" : "Yeni Adres Ekle"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Adres Başlığı
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Ev, İş, vb."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="0555 123 45 67"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Adres
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.fullAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullAddress: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Mahalle, sokak, bina no, daire no"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        İl
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="İstanbul"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        İlçe
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.district}
                        onChange={(e) =>
                          setFormData({ ...formData, district: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Kadıköy"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Posta Kodu
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postalCode: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="34710"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={formData.isDefault}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isDefault: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-primary focus:ring-ring border-input rounded"
                    />
                    <label
                      htmlFor="isDefault"
                      className="ml-2 block text-sm text-foreground"
                    >
                      Varsayılan adres olarak ayarla
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingAddress(null);
                        setFormData({
                          title: "",
                          fullAddress: "",
                          city: "",
                          district: "",
                          postalCode: "",
                          phoneNumber: "",
                          isDefault: false,
                        });
                      }}
                      className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-md hover:bg-muted/80"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700"
                    >
                      {editingAddress ? "Güncelle" : "Kaydet"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Address List */}
            {addresses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground/60 mb-4">
                  <svg
                    className="mx-auto h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Henüz adres eklenmemiş
                </h3>
                <p className="text-muted-foreground mb-6">
                  İlk adresinizi ekleyerek alışverişe başlayın!
                </p>
                <button
                  title="Adres Ekle"
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
                >
                  Adres Ekle
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-foreground">
                    Kayıtlı Adresler
                  </h2>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                  >
                    Yeni Adres Ekle
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="bg-card rounded-lg shadow-sm border border-border p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {address.title}
                          </h3>
                          {address.isDefault && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                              Varsayılan
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            title="Adresi Düzenle"
                            type="button"
                            onClick={() => handleEdit(address)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            title="Adresi Sil"
                            type="button"
                            onClick={() => handleDelete(address.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>{address.fullAddress}</p>
                        <p>
                          {address.district}, {address.city}{" "}
                          {address.postalCode}
                        </p>
                        {address.phoneNumber && (
                          <p>Tel: {address.phoneNumber}</p>
                        )}
                      </div>

                      {!address.isDefault && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                          >
                            Varsayılan Adres Yap
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
