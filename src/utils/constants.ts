export const REGEX = {
    EMAIL: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    PHONE: new RegExp(/^\+?[0-9]{1,15}$/),
    ONLYNUMBERS: new RegExp(/^\d*$|^$/),
    LATITUDE: new RegExp(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/),
    LONGITUDE: new RegExp(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/),
    NUMBERS_DOTS_COMMAS: new RegExp("^[0-9]+([,][0-9]+)?$"),
    CURRENCY: new RegExp(/^[$€£¥]$/),
    URL: new RegExp(/^(https?:\/\/)([^\s/$.?#].[^\s]*)\.[^\s]{2,}$/),
};


export const NAME_RESTRICTION = 25;
export const DESCRIPTION_RESTRICTION = 250;

export const errorBackground = "#ff7b7b";

export const titleStyle = {
    fontSize: "2.5rem", marginBottom: "100px"
}

export enum AppNames {
    FORMS = 'Forms',
    SHOP = 'Shop',
    FINANCE = 'Finance',
};

export const nameRestrictionMessage = "The size should be between 0 and " + NAME_RESTRICTION

export const descriptionRestrictionMessage = "The size should be between 0 and " + DESCRIPTION_RESTRICTION
export const onlyNumbersRestrictionMessage = "Only numbers allowed"
