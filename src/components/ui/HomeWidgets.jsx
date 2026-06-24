import life from "../../assets/life.svg";
import heart from "../../assets/life.svg";
import document from "../../assets/document.svg";
import user from "../../assets/user.svg";
import call from "../../assets/call.svg";
import trendUp from "../../assets/trendUp.svg";
import { cards } from "../../constants/Dashboard/cards";

const HomeWidgets = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 self-stretch">
      {cards.map((card) => (
        <div
          key={card.title}
          className="relative flex flex-1 flex-col justify-center items-start gap-3 p-6 rounded-3xl border border-gray-300 bg-gray-200 shadow-[0_1px_4px_0_rgba(128,189,209,0.10)] ">
          {/* Icon */}
          <div className="absolute right-0.5 md:right-5 top-12  flex h-10 w-10 items-center justify-center">
            <img
              src={card.icon}
              alt={card.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Child One */}
          <div className="flex flex-col justify-center items-start">
            <p className="text-sm font-montserrat text-gray-700 ">
              {card.title}
            </p>

            <h2 className="text-lg font-montserrat text-gray-800  ">
              {card.value}
            </h2>
          </div>

          {/* Child Two */}
          <div className="flex justify-start md:items-center md:justify-center gap-2">
            <img src={trendUp} alt="trend" className="w-6 h-6" />

            <span className="text-xb text-green-500">{card.growth}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default HomeWidgets;
