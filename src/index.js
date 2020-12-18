import "./index.css";
import bar_chart from "./common/charts/barchart" 
import box_plot from "./common/charts/boxplot"
import heatmap from "./common/charts/heatmap";
import pairplot from "./common/charts/pairplot";
import {bulk} from "./common/data"

bar_chart("chartOne")
box_plot("chartTwo")
heatmap("chartThree")
pairplot("chartFour")