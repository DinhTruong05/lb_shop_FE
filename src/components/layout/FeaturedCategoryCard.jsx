export default function FeaturedCategoryCard({ title, image }) {
    return (
      <div className="relative group aspect-video rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-glow-purple transition-all duration-300">
  
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
  
        <div className="absolute inset-0 bg-black/50 group-hover:bg-accent-purple/30 transition-colors"></div>
  
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-black font-display text-white">{title}</h3>
        </div>
  
      </div>
    );
  }
  