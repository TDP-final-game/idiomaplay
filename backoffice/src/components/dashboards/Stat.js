import "./dashboard.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div>
            <span className="featuredTitle">Promedio de resolución</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">2:41</span>
            </div>
            {/* <span className="featuredSub">Compared to last month</span> */}
    </div>
  );
}