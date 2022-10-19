import Blogs from "../pages/Blogs"
import Review from "../pages/Review"
import Team from "../pages/Team"
import {
	BarChartOutlined,
	UsergroupDeleteOutlined,
	FundOutlined,
} from '@ant-design/icons'

 
 export const routes =[
    {
        id:1,
        path:"/",
        component: <Blogs/>
    },
    {
        id:2,
        path:"/team",
        component: <Team/>
    },
    {
        id:3,
        path:"/review",
        component: <Review/>
    }
 ]


export const menubar =[
    {
        id:1,
        title: "Blog",
        path: "/",
        icon:BarChartOutlined
},
{
    id:2,
    title: "Team",
    path: "/team",
    icon:UsergroupDeleteOutlined
},
{
    id:3,
    title: "Review",
    path: "/review",
    icon: FundOutlined
}
]