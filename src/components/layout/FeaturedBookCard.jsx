export default function FeaturedBookCard({ title, author, price, image }) {
    return (
      <div className="flex h-full flex-col gap-4 rounded-lg bg-surface-dark border border-accent-blue/20 shadow-lg min-w-60 hover:border-accent-blue/50 hover:shadow-glow-blue transition-all duration-300">
  
        <div
          className="w-full bg-center bg-cover aspect-[3/4] rounded-t-lg"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
  
        <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
          <div>
            <p className="text-text-primary-dark text-base font-bold font-display">
              {title}
            </p>
            <p className="text-text-secondary-dark text-sm">{author}</p>
            <p className="text-accent-blue text-sm font-bold mt-1">${price}</p>
          </div>
  
          <button className="h-10 px-4 bg-surface-dark/50 border border-accent-blue rounded-lg text-accent-blue text-sm font-bold hover:bg-accent-blue hover:text-background-dark transition">
            View Details
          </button>
        </div>
  
      </div>
    );
  }
  