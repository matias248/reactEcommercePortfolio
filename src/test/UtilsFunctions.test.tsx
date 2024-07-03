import { AppNames } from "../utils/constants"
import { calculateTotalPages, filterStores, getCurrentApp, getPaginatedItems, joinArrayWithComma } from "../utils/sharedComponents/utilsFunctions"
import { currentStores } from '../LocalData/Stores';


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

describe('joinArrayWithComma', () => {
    it('Test one element', () => {
        const input = ["a"];
        const result = joinArrayWithComma(input);
        expect(result).toBe("a");
    });

    it(' Test Two elements ', () => {
        const input = ["a", "b"];
        const result = joinArrayWithComma(input);
        expect(result).toBe("a,b");
    });

    it('Test n elements', () => {
        const input = ["a", "b", "c"];
        const result = joinArrayWithComma(input);
        expect(result).toBe("a,b,c");
    });

    it('Test 0 elements', () => {
        const input: string[] = [];
        const result = joinArrayWithComma(input);
        expect(result).toBe("");
    });

    it('Should count empty elements', () => {
        const input = ["a", "", "b"];
        const result = joinArrayWithComma(input);
        expect(result).toBe("a,,b");
    });
});



describe('calculateTotalPages', () => {
    test('should return 0 when totalItems is 0', () => {
        expect(calculateTotalPages(0, 10)).toBe(0);
    });

    test('should return 3 when totalItems is 25 and itemsPerPage is 10', () => {
        expect(calculateTotalPages(25, 10)).toBe(3);
    });

    test('should return 2 when totalItems is 20 and itemsPerPage is 10', () => {
        expect(calculateTotalPages(20, 10)).toBe(2);
    });

    test('should return 1 when totalItems is 5 and itemsPerPage is 10', () => {
        expect(calculateTotalPages(5, 10)).toBe(1);
    });

    test('should handle itemsPerPage <= 0 by using the default itemsPerPage of 10', () => {
        expect(calculateTotalPages(25, 0)).toBe(3);
        expect(calculateTotalPages(25, -5)).toBe(3);
    });

    test('should return 3 when totalItems is 25 and itemsPerPage is 0 (default itemsPerPage of 10)', () => {
        expect(calculateTotalPages(25, 0)).toBe(3);
    });

    test('should return 3 when totalItems is 25 and itemsPerPage is -5 (default itemsPerPage of 10)', () => {
        expect(calculateTotalPages(25, -5)).toBe(3);
    });

    test('should handle large amounts of items correctly', () => {
        expect(calculateTotalPages(100000, 10)).toBe(10000);
        expect(calculateTotalPages(100000, 1)).toBe(100000);
    });
});


describe('getPaginatedItems', () => {
    const array = [
        "Element 1", "Element 2", "Element 3", "Element 4", "Element 5",
        "Element 6", "Element 7", "Element 8", "Element 9", "Element 10",
        "Element 11", "Element 12", "Element 13", "Element 14", "Element 15"
    ];

    test('should return the first 10 items for pageIndex 0 and itemsPerPage 10', () => {
        const result = getPaginatedItems(array, 0, 10);
        expect(result).toEqual([
            "Element 1", "Element 2", "Element 3", "Element 4", "Element 5",
            "Element 6", "Element 7", "Element 8", "Element 9", "Element 10"
        ]);
    });

    test('should return the next 5 items for pageIndex 1 and itemsPerPage 10', () => {
        const result = getPaginatedItems(array, 1, 10);
        expect(result).toEqual([
            "Element 11", "Element 12", "Element 13", "Element 14", "Element 15"
        ]);
    });

    test('should return an empty array for pageIndex out of range', () => {
        const result = getPaginatedItems(array, 2, 10);
        expect(result).toEqual([]);
    });

    test('should return the correct items for small itemsPerPage', () => {
        const result = getPaginatedItems(array, 0, 5);
        expect(result).toEqual([
            "Element 1", "Element 2", "Element 3", "Element 4", "Element 5"
        ]);
    });

    test('should handle itemsPerPage greater than array length', () => {
        const result = getPaginatedItems(array, 0, 20);
        expect(result).toEqual([
            "Element 1", "Element 2", "Element 3", "Element 4", "Element 5",
            "Element 6", "Element 7", "Element 8", "Element 9", "Element 10",
            "Element 11", "Element 12", "Element 13", "Element 14", "Element 15"
        ]);
    });
    test('should handle second page well', () => {
        const result = getPaginatedItems(array, 1, 10);
        expect(result).toEqual([
            "Element 11", "Element 12", "Element 13", "Element 14", "Element 15"
        ]);
    });

    test('should handle negative pageIndex by returning empty array', () => {
        const result = getPaginatedItems(array, -1, 10);
        expect(result).toEqual([]);
    });

    test('should handle negative itemsPerPage by returning empty array', () => {
        const result = getPaginatedItems(array, 0, -10);
        expect(result).toEqual([]);
    });
});


describe('filterStores', () => {
    test('should return stores with name containing the criterion', () => {
        const criterion = "Simple Store";
        const filteredStores = filterStores(currentStores, criterion);
        expect(filteredStores).toEqual([currentStores[0]]);
    });

    test('should return stores with city containing the criterion', () => {
        const criterion = "Simple city";
        const filteredStores = filterStores(currentStores, criterion);
        expect(filteredStores).toEqual([currentStores[0]]);
    });

    test('should return stores with postal code containing the criterion', () => {
        const criterion = "31000";
        const filteredStores = filterStores(currentStores, criterion);
        expect(filteredStores).toEqual(currentStores);

    });

    test('should return stores if any field contains the criterion (case insensitive)', () => {
        const criterion = "City";
        const filteredStores = filterStores(currentStores, criterion);
        expect(filteredStores).toEqual(currentStores);

    });

    test('should return an empty array if no team matches the criterion', () => {
        const criterion = "Nonexistent";
        const filteredStores = filterStores(currentStores, criterion);
        expect(filteredStores).toEqual([]);
    });
});
