import Icon from "./Icon";

export default function TopNavBar() {
  return (
    <header className="flex items-center justify-between pb-6 border-b border-white/10">
      <h1 className="text-white text-3xl font-bold">Infomation Overview</h1>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            className="w-full bg-[#1b2537] rounded-full h-12 pl-10 pr-4 text-white placeholder-white/40 focus:ring-2 focus:ring-primary outline-none"
            placeholder="Search..."
          />
        </div>

        <button className="flex items-center justify-center size-12 bg-[#1b2537] rounded-full text-white/80 hover:bg-primary/20 hover:text-primary">
          <Icon name="notifications" className="text-2xl" />
        </button>

        <div
          className="rounded-full size-12 bg-center bg-cover"
          style={{
            backgroundImage: `url("https://i.pravatar.cc/300?img=5")`,
          }}
        ></div>
      </div>
    </header>
  );
}
