

export const HomePage = (): React.JSX.Element => {
    const title = "App presentation:"
    const IntroPlatform = 'Welcome to ECportfolio, a platform designed to simulate a simple e-commerce.' 
    const IntroDiffApp ='ECportfolio integrates three applications:';
    const AppFormsName = "AppForms";
    const presentationAppForms = "Easily create and manage data with intuitive forms. FormsApp ensures you can build a comprehensive database effortlessly.";
    const AppShopName = "AppShop";
    const presentationAppShop = "Simulate a shop website. Present products with detailed descriptions and Images, allowing visitors to browse as if they were shopping online.";
    /*const AppFinanceName = "AppFinance";
    const presentationAppFinance = "Simulate an app that allows to manage invoices, Past purchases...";*/

    return (
        <div className="flex mx-3 items-center flex-col">
            <div className="mb-8 text-xl  dark:text-white" >{IntroPlatform}</div>
            <div className="mb-6 dark:text-white self-start text-xl">
                <div>{IntroDiffApp}</div>
            </div>
            <div className="mb-6 dark:text-white self-start text-base">
                <div className="font-bold">{AppFormsName + ":"}</div>
                <div>{presentationAppForms}</div>
            </div>
            <div className="mb-6 dark:text-white self-start text-base">
                <div className="font-bold">{AppShopName + ":"}</div>
                <div>{presentationAppShop}</div>
            </div>
           {/* <div className="mb-6 dark:text-white self-start">
                <div className="font-bold">{AppFinanceName + ":"}</div>
                <div>{presentationAppFinance}</div>
            </div>*/}
        </div>
    );
}
