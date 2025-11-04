import Image from "next/image";

interface CategoryHeaderProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const CategoryHeader = ({ title, description, imageUrl }: CategoryHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg overflow-hidden mb-8">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">{description}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
