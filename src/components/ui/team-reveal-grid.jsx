import { useState } from "react";
import { cn } from "../../lib/utils";

const defaultMembers = [
  {
    name: "Alex Morgan",
    role: "Project Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700",
    description: "Leading the vision for a cleaner and more sustainable future.",
  },
  {
    name: "Sarah Chen",
    role: "Environmental Researcher",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700",
    description: "Turning environmental research into meaningful insights.",
  },
  {
    name: "Daniel Smith",
    role: "Technology Lead",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700",
    description: "Building technology for smarter environmental monitoring.",
  },
  {
    name: "Emily Johnson",
    role: "Data Analyst",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=700",
    description: "Making environmental data easier to understand and act on.",
  },
];

export default function TeamRevealGrid({
  members = defaultMembers,
  className = "",
}) {
  const [activeMember, setActiveMember] = useState(0);

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {members.map((member, index) => {
          const active = activeMember === index;

          return (
            <button
              key={member.name}
              type="button"
              onClick={() => setActiveMember(index)}
              onMouseEnter={() => setActiveMember(index)}
              className={cn(
                "group relative text-left overflow-hidden rounded-2xl border transition-all duration-500",
                "bg-[#0b241c] border-emerald-900/50 hover:border-emerald-400/70",
                active && "border-emerald-400 shadow-lg shadow-emerald-950/40"
              )}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#061a13] via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-emerald-300 text-xs uppercase tracking-widest mb-2">
                    {member.role}
                  </p>
                  <h3 className="text-white text-xl font-bold">
                    {member.name}
                  </h3>
                </div>
              </div>

              <div className={cn(
                "grid transition-all duration-500",
                active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}>
                <div className="overflow-hidden">
                  <p className="p-5 pt-3 text-sm text-gray-300 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white">
                {active ? "−" : "+"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
