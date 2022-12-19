import PageOne from "../pages/page_one/PageOne";
import PageTwo from "../pages/page_two/PageTwo";
import Error from "../components/others/Error";

export default function switchh(componentName, data){

    const components = [
        {
            componentName: "page1",
            component: <PageOne data={data} />
        },
        {
            componentName: "page2",
            component: <PageTwo data={data} />
        }
    ];
    
    let ret = <Error />;

    components.forEach(cmp => {
        if(cmp.componentName === componentName)
            ret = cmp.component;
    })
    return ret;
}