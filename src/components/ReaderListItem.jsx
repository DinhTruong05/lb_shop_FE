export default function ReaderListItem({ rank, name, books, avatarUrl }) {
    return (
      <li className="flex items-center gap-4">
        <div
          className="size-12 rounded-full bg-center bg-cover"
          style={{ backgroundImage: `url("${avatarUrl}")` }}
        ></div>
  
        <div className="flex-grow">
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-white/60">{books} Books</p>
        </div>
  
        <span className="text-lg font-bold text-primary">#{rank}</span>
      </li>
    );
  }
  