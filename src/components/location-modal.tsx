"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Clock, Check } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: LocationData) => void;
}

interface LocationData {
  id: string;
  city: string;
  district: string;
  fullAddress: string;
  isDefault?: boolean;
}

// Mock location data
const mockLocations: LocationData[] = [
  {
    id: "1",
    city: "İstanbul",
    district: "Kadıköy",
    fullAddress: "Kadıköy, İstanbul",
    isDefault: true,
  },
  {
    id: "2",
    city: "İstanbul",
    district: "Beşiktaş",
    fullAddress: "Beşiktaş, İstanbul",
  },
  {
    id: "3",
    city: "İstanbul",
    district: "Şişli",
    fullAddress: "Şişli, İstanbul",
  },
  {
    id: "4",
    city: "Ankara",
    district: "Çankaya",
    fullAddress: "Çankaya, Ankara",
  },
  {
    id: "5",
    city: "Ankara",
    district: "Keçiören",
    fullAddress: "Keçiören, Ankara",
  },
  {
    id: "6",
    city: "İzmir",
    district: "Konak",
    fullAddress: "Konak, İzmir",
  },
  {
    id: "7",
    city: "İzmir",
    district: "Karşıyaka",
    fullAddress: "Karşıyaka, İzmir",
  },
  {
    id: "8",
    city: "Bursa",
    district: "Osmangazi",
    fullAddress: "Osmangazi, Bursa",
  },
  {
    id: "9",
    city: "Antalya",
    district: "Muratpaşa",
    fullAddress: "Muratpaşa, Antalya",
  },
  {
    id: "10",
    city: "Adana",
    district: "Seyhan",
    fullAddress: "Seyhan, Adana",
  },
];

const recentLocations: LocationData[] = [
  {
    id: "recent-1",
    city: "İstanbul",
    district: "Kadıköy",
    fullAddress: "Kadıköy, İstanbul",
  },
  {
    id: "recent-2",
    city: "Ankara",
    district: "Çankaya",
    fullAddress: "Çankaya, Ankara",
  },
];

export function LocationModal({ isOpen, onClose, onLocationSelect }: LocationModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>(mockLocations);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = mockLocations.filter(
        (location) =>
          location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.fullAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(mockLocations);
    }
  }, [searchTerm]);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    onLocationSelect(location);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock current location data
          const currentLocation: LocationData = {
            id: "current",
            city: "İstanbul",
            district: "Kadıköy",
            fullAddress: "Mevcut Konumunuz",
          };
          handleLocationSelect(currentLocation);
        },
        (error) => {
          console.error("Konum alınamadı:", error);
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Konum Seçin
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Şehir veya ilçe ara..."
              className="pl-10"
            />
          </div>

          {/* Current Location Button */}
          <Button
            variant="outline"
            onClick={handleUseCurrentLocation}
            className="w-full"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Mevcut Konumumu Kullan
          </Button>

          {/* Recent Locations */}
          {!searchTerm && recentLocations.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Son Kullanılan Konumlar
              </h3>
              <div className="space-y-2">
                {recentLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{location.fullAddress}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Popular Locations */}
          {!searchTerm && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Popüler Şehirler
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana"].map((city) => (
                  <Button
                    key={city}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const cityLocation = mockLocations.find(loc => loc.city === city);
                      if (cityLocation) {
                        handleLocationSelect(cityLocation);
                      }
                    }}
                    className="justify-start"
                  >
                    <MapPin className="w-3 h-3 mr-2" />
                    {city}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchTerm && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Arama Sonuçları ({filteredLocations.length})
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((location) => (
                    <Card
                      key={location.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{location.fullAddress}</p>
                              <p className="text-sm text-muted-foreground">
                                {location.city} - {location.district}
                              </p>
                            </div>
                          </div>
                          {location.isDefault && (
                            <Badge variant="secondary" className="text-xs">
                              Varsayılan
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Aradığınız konum bulunamadı</p>
                    <p className="text-sm">Farklı bir arama terimi deneyin</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All Locations */}
          {!searchTerm && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Tüm Konumlar
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {mockLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{location.fullAddress}</p>
                            <p className="text-sm text-muted-foreground">
                              {location.city} - {location.district}
                            </p>
                          </div>
                        </div>
                        {location.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Varsayılan
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
