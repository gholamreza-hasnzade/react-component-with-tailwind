import type { FilterType } from "@/components/molecules/dataTable/components/AdvancedFilter";

type BetweenFilterValue = { min: string | number; max: string | number };

export interface FilterValue {
  type: FilterType;
  value:
    | string
    | number
    | boolean
    | null
    | undefined
    | BetweenFilterValue
    | (string | number)[];
  filterFn?: (row: any) => boolean;
}

export function createAdvancedFilterFn<T extends object>(
  row: T,
  columnId: string,
  filterValue: FilterValue
) {
  const value = (row as Record<string, unknown>)[columnId];
  const { type, value: filterVal } = filterValue;

  if (value === null || value === undefined) {
    if (type === "isNull") return true;
    if (type === "isNotNull") return false;
    return false;
  }

  const stringValue = String(value).toLowerCase();
  const filterStringValue = String(filterVal).toLowerCase();

  let result = false;

  switch (type) {
    case "custom":
      // Use custom filter function if provided
      if (filterValue.filterFn) {
        return filterValue.filterFn({
          getValue: (id: string) => (row as Record<string, unknown>)[id],
        });
      }
      result = true;
      break;

    case "equals":
      result = stringValue === filterStringValue;
      break;

    case "contains":
      result = stringValue.includes(filterStringValue);
      break;

    case "startsWith":
      result = stringValue.startsWith(filterStringValue);
      break;

    case "endsWith":
      result = stringValue.endsWith(filterStringValue);
      break;

    case "between": {
      if (
        filterVal &&
        typeof filterVal === "object" &&
        !Array.isArray(filterVal) &&
        "min" in filterVal &&
        "max" in filterVal
      ) {
        const betweenVal = filterVal as BetweenFilterValue;
        const numValue = parseFloat(value as string);
        const min = parseFloat(betweenVal.min as string);
        const max = parseFloat(betweenVal.max as string);

        if (isNaN(numValue) || isNaN(min) || isNaN(max)) {
          result =
            stringValue >= (betweenVal.min as string).toLowerCase() &&
            stringValue <= (betweenVal.max as string).toLowerCase();
        } else {
          result = numValue >= min && numValue <= max;
        }
      } else {
        result = true;
      }
      break;
    }

    case "greaterThan": {
      const gtValue = parseFloat(value as string);
      const gtFilter = parseFloat(filterVal as string);
      if (isNaN(gtValue) || isNaN(gtFilter)) {
        result = stringValue > filterStringValue;
      } else {
        result = gtValue > gtFilter;
      }
      break;
    }

    case "lessThan": {
      const ltValue = parseFloat(value as string);
      const ltFilter = parseFloat(filterVal as string);
      if (isNaN(ltValue) || isNaN(ltFilter)) {
        result = stringValue < filterStringValue;
      } else {
        result = ltValue < ltFilter;
      }
      break;
    }

    case "greaterThanOrEqual": {
      const gteValue = parseFloat(value as string);
      const gteFilter = parseFloat(filterVal as string);
      if (isNaN(gteValue) || isNaN(gteFilter)) {
        result = stringValue >= filterStringValue;
      } else {
        result = gteValue >= gteFilter;
      }
      break;
    }

    case "lessThanOrEqual": {
      const lteValue = parseFloat(value as string);
      const lteFilter = parseFloat(filterVal as string);
      if (isNaN(lteValue) || isNaN(lteFilter)) {
        result = stringValue <= filterStringValue;
      } else {
        result = lteValue <= lteFilter;
      }
      break;
    }

    case "in":
      if (Array.isArray(filterVal)) {
        result = filterVal.some((v) => String(v).toLowerCase() === stringValue);
      } else {
        result = false;
      }
      break;

    case "notIn":
      if (Array.isArray(filterVal)) {
        result = !filterVal.some(
          (v) => String(v).toLowerCase() === stringValue
        );
      } else {
        result = true;
      }
      break;

    case "isNull":
      result = value === null || value === undefined;
      break;

    case "isNotNull":
      result = value !== null && value !== undefined;
      break;

    default:
      result = true;
  }

  return result;
}

export function getFilterDisplayText(filterValue: FilterValue): string {
  const { type, value } = filterValue;

  switch (type) {
    case "custom":
      return String(value);

    case "equals":
      return `= ${value}`;

    case "contains":
      return `contains "${value}"`;

    case "startsWith":
      return `starts with "${value}"`;

    case "endsWith":
      return `ends with "${value}"`;

    case "between":
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        "min" in value &&
        "max" in value
      ) {
        const betweenVal = value as BetweenFilterValue;
        return `${betweenVal.min} - ${betweenVal.max}`;
      }
      return "between";

    case "greaterThan":
      return `> ${value}`;

    case "lessThan":
      return `< ${value}`;

    case "greaterThanOrEqual":
      return `≥ ${value}`;

    case "lessThanOrEqual":
      return `≤ ${value}`;

    case "in":
      if (Array.isArray(value)) {
        return `in [${value.join(", ")}]`;
      }
      return "in list";

    case "notIn":
      if (Array.isArray(value)) {
        return `not in [${value.join(", ")}]`;
      }
      return "not in list";

    case "isNull":
      return "is null";

    case "isNotNull":
      return "is not null";

    default:
      return type;
  }
}
