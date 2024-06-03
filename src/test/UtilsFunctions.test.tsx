import { AppNames } from "../utils/constants"
import { getCurrentApp } from "../utils/sharedComponents/utilsFunctions"


describe('Test getCurrentApp', () => {
    it('forms ', () => {
        const currentApp: AppNames | undefined = getCurrentApp("/stores");
        const currentApp2: AppNames | undefined = getCurrentApp("/stores/1");
        const currentApp3: AppNames | undefined = getCurrentApp("/stores/1/products");
        const currentApp4: AppNames | undefined = getCurrentApp("/stores/1/products/1");
        const currentApp5: AppNames | undefined = getCurrentApp("/finance/stores/1/products/1");


        expect(currentApp).toBe(AppNames.FORMS)
        expect(currentApp2).toBe(AppNames.FORMS)
        expect(currentApp3).toBe(AppNames.FORMS)
        expect(currentApp4).toBe(AppNames.FORMS)
        expect(currentApp5).toBe(AppNames.FINANCE)

    })
    it('finance ', () => {
        const currentApp: AppNames | undefined = getCurrentApp("/finance");
        const currentApp2: AppNames | undefined = getCurrentApp("/stores/finance");

        expect(currentApp).toBe(AppNames.FINANCE)
        expect(currentApp2).toBe(AppNames.FORMS)

    })
    it('shop ', () => {
        const currentApp: AppNames | undefined = getCurrentApp("/shop");
        const currentApp2: AppNames | undefined = getCurrentApp("/stores/finance");

        expect(currentApp).toBe(AppNames.SHOP )
        expect(currentApp2).toBe(AppNames.FORMS)

    })
})