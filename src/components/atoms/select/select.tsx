import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useId,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";

type ColorKey =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";

type Size = "sm" | "md" | "lg";

type Option = {
  [key: string]: unknown;
  disabled?: boolean;
};

type GroupedOption = {
  label: string;
  options: Option[];
  disabled?: boolean;
};

type SelectProps = {
  apiUrl?: string;
  titleKey: string | string[];
  valueKey: string;
  variant?: "contained" | "outlined" | "text";
  color?: ColorKey;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  width?: string | number;
  size?: Size;
  multiple?: boolean;
  value?: Option | Option[] | string | number | (string | number)[] | undefined;
  onChange?: (value: Option | Option[]) => void;
  searchParamKey?: string;
  searchable?: boolean;
  urlParams?: Record<string, string | number>;
  error?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  options?: Option[];
  groupedOptions?: GroupedOption[];
  editMode?: boolean;
  defaultValue?: string | number | Option | Array<string | number | Option>;
  helperText?: string;
  fetchItemById?: (id: string) => Promise<Option | null>;
  dropdownHeader?: React.ReactNode;
  onAddNew?: () => void;
  addNewLabel?: string;
  renderOption?: (
    item: Option,
    state: { isSelected: boolean }
  ) => React.ReactNode;
  renderSelectedValue?: (itemOrItems: Option | Option[]) => React.ReactNode;
  getOptionClassName?: (item: Option, state: { isSelected: boolean }) => string;
  disableDefaultValues?: boolean;
  alwaysShowOverflowTooltip?: boolean;
  searchPathTemplate?: string;
};

const colorMap = {
  primary: {
    contained:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 disabled:bg-blue-400",
    outlined:
      "border border-blue-600 text-blue-600 hover:bg-blue-100 hover:border-blue-700 focus:ring-2 focus:ring-blue-300 disabled:text-blue-400 disabled:border-blue-400",
    text: "text-blue-600 hover:text-blue-900 focus:ring-2 focus:ring-blue-300 disabled:text-blue-400",
  },
  secondary: {
    contained:
      "bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-300 disabled:bg-gray-400",
    outlined:
      "border border-gray-600 text-gray-600 hover:bg-gray-100 hover:border-gray-700 focus:ring-2 focus:ring-gray-300 disabled:text-gray-400 disabled:border-gray-400",
    text: "text-gray-600 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 disabled:text-gray-400",
  },
  success: {
    contained:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-300 disabled:bg-green-400",
    outlined:
      "border border-green-600 text-green-600 hover:bg-green-100 hover:border-green-700 focus:ring-2 focus:ring-green-300 disabled:text-green-400 disabled:border-green-400",
    text: "text-green-600 hover:text-green-900 focus:ring-2 focus:ring-green-300 disabled:text-green-400",
  },
  error: {
    contained:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-300 disabled:bg-red-400",
    outlined:
      "border border-red-600 text-red-600 hover:bg-red-100 hover:border-red-700 focus:ring-2 focus:ring-red-300 disabled:text-red-400 disabled:border-red-400",
    text: "text-red-600 hover:text-red-700 focus:ring-2 focus:ring-red-300 disabled:text-red-400",
  },
  warning: {
    contained:
      "bg-yellow-500 text-black hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 disabled:bg-yellow-300",
    outlined:
      "border border-yellow-500 text-yellow-600 hover:bg-yellow-100 hover:border-yellow-700 focus:ring-2 focus:ring-yellow-300 disabled:text-yellow-400 disabled:border-yellow-400",
    text: "text-yellow-600 hover:text-yellow-900 focus:ring-2 focus:ring-yellow-300 disabled:text-yellow-400",
  },
  info: {
    contained:
      "bg-sky-500 text-white hover:bg-sky-600 focus:ring-2 focus:ring-sky-300 disabled:bg-sky-300",
    outlined:
      "border border-sky-500 text-sky-500 hover:bg-sky-100 hover:border-sky-700 focus:ring-2 focus:ring-sky-300 disabled:text-sky-400 disabled:border-sky-400",
    text: "text-sky-500 hover:text-sky-900 focus:ring-2 focus:ring-sky-300 disabled:text-sky-400",
  },
};

export const Select: React.FC<SelectProps> = ({
  apiUrl,
  titleKey,
  valueKey,
  variant = "contained",
  color = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  width,
  size = "md",
  multiple = false,
  value,
  onChange,
  searchParamKey = "q",
  searchable = true,
  urlParams = {},
  error,
  required = false,
  label,
  placeholder,
  id,
  name,
  options,
  groupedOptions,
  editMode = false,
  defaultValue,
  helperText,
  fetchItemById,
  dropdownHeader,
  onAddNew,
  addNewLabel,
  renderOption,
  renderSelectedValue,
  getOptionClassName,
  disableDefaultValues,
  alwaysShowOverflowTooltip = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const generatedId = useId();
  const controlId = id ?? `select-${generatedId}`;

  const getInitialValues = () => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        return value.map((v) =>
          typeof v === "object" && v !== null
            ? String((v as Option)[valueKey])
            : String(v as string | number)
        );
      } else if (typeof value === "object" && value !== null) {
        return [String((value as Option)[valueKey])];
      } else if (typeof value === "string" || typeof value === "number") {
        return [String(value)];
      }
      return [];
    }
    if (editMode && defaultValue !== undefined) {
      if (Array.isArray(defaultValue)) {
        return defaultValue.map((v) =>
          typeof v === "object" && v !== null
            ? String((v as Option)[valueKey])
            : String(v as string | number)
        );
      } else if (typeof defaultValue === "object" && defaultValue !== null) {
        return [String((defaultValue as Option)[valueKey])];
      } else if (
        typeof defaultValue === "string" ||
        typeof defaultValue === "number"
      ) {
        return [String(defaultValue)];
      }
      return [];
    }
    return [];
  };

  const [selectedValues, setSelectedValues] = useState<string[]>(
    getInitialValues()
  );

  useEffect(() => {
    if (value !== undefined) {
      let next: string[] = [];
      if (Array.isArray(value)) {
        next = value.map((v) =>
          typeof v === "object" && v !== null
            ? String((v as Option)[valueKey])
            : String(v as string | number)
        );
      } else if (typeof value === "object" && value !== null) {
        next = [String((value as Option)[valueKey])];
      } else if (typeof value === "string" || typeof value === "number") {
        next = [String(value)];
      }
      const same =
        next.length === selectedValues.length &&
        next.every((id, i) => id === selectedValues[i]);
      if (!same) setSelectedValues(next);
    }
  }, [value, valueKey]);

  useEffect(() => {
    if (value === undefined && defaultValue !== undefined) {
      let next: string[] = [];
      if (Array.isArray(defaultValue)) {
        next = defaultValue.map((v) =>
          typeof v === "object" && v !== null
            ? String((v as Option)[valueKey])
            : String(v as string | number)
        );
      } else if (typeof defaultValue === "object" && defaultValue !== null) {
        next = [String((defaultValue as Option)[valueKey])];
      } else if (
        typeof defaultValue === "string" ||
        typeof defaultValue === "number"
      ) {
        next = [String(defaultValue)];
      }
      const same =
        next.length === selectedValues.length &&
        next.every((id, i) => id === selectedValues[i]);
      if (!same) setSelectedValues(next);
    }
  }, [defaultValue, value, valueKey]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const [lockedIds, setLockedIds] = useState<Set<string>>(new Set());
  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleChipCount, setVisibleChipCount] = useState<number>(
    Number.MAX_SAFE_INTEGER
  );
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const [isIndicatorHovered, setIsIndicatorHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const lastEmittedIdsRef = useRef<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const [optionsData, setOptionsData] = useState<Option[]>([]);
  const [resolvedItemsById, setResolvedItemsById] = useState<
    Record<string, Option>
  >({});
  const resolvingIdsRef = useRef<Set<string>>(new Set());
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const limit = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!disableDefaultValues) {
      setLockedIds(new Set());
      return;
    }
    const toIds = (val: SelectProps["defaultValue"]): string[] => {
      if (val === undefined || val === null) return [];
      if (Array.isArray(val)) {
        return val.map((v) =>
          typeof v === "object" && v !== null
            ? String((v as Option)[valueKey])
            : String(v as string | number)
        );
      }
      if (typeof val === "object" && val !== null) {
        return [String((val as Option)[valueKey])];
      }
      return [String(val as string | number)];
    };
    setLockedIds(new Set(toIds(defaultValue)));
  }, [disableDefaultValues, defaultValue, valueKey]);

  const fetchOptions = useCallback(
    async (reset = false) => {
      if (!apiUrl) return;
      setLoadingMore(true);
      const url = new URL(apiUrl);
      url.searchParams.set("limit", String(limit));
      url.searchParams.set("skip", String(reset ? 0 : skip));
      if (debouncedSearch) {
        url.searchParams.set(searchParamKey, debouncedSearch);
      }
      Object.entries(urlParams).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
      const response = await fetch(url.toString());
      const result = await response.json();
      const newOptions = result.products || result;
      setOptionsData((prev) => (reset ? newOptions : [...prev, ...newOptions]));
      setHasMore(newOptions.length === limit);
      setLoadingMore(false);
      if (reset) setSkip(limit);
      else setSkip((prev) => prev + limit);
    },
    [apiUrl, skip, limit, debouncedSearch, searchParamKey, urlParams]
  );

  useEffect(() => {
    if (isOpen && apiUrl) {
      fetchOptions(true);
    }
    // eslint-disable-next-line
  }, [isOpen, debouncedSearch, apiUrl]);


  useEffect(() => {
    const selectedIds = new Set(selectedValues);
    if (selectedIds.size === 0) return;

    const presentIds = new Set(optionsData.map((it) => String(it[valueKey])));
    const resolvedIds = new Set(Object.keys(resolvedItemsById));
    const missing = Array.from(selectedIds).filter(
      (id) => !presentIds.has(id) && !resolvedIds.has(id)
    );
    if (missing.length === 0) return;

    const toFetch = missing.filter((id) => !resolvingIdsRef.current.has(id));
    if (toFetch.length === 0) return;
    toFetch.forEach((id) => resolvingIdsRef.current.add(id));

    const doFetch = async () => {
      const results: Record<string, Option> = {};
      await Promise.all(
        toFetch.map(async (id) => {
          try {
            let item: Option | null = null;
            if (fetchItemById) {
              item = await fetchItemById(id);
            } else if (apiUrl) {
              const endpoint = `${apiUrl.replace(
                /\/$/,
                ""
              )}/${encodeURIComponent(id)}`;
              const resp = await fetch(endpoint);
              if (resp.ok) {
                const json = await resp.json();
                item =
                  json && typeof json === "object" ? (json as Option) : null;
              }
            }
            if (item && (item as Option)[valueKey] != null) {
              results[id] = item;
            }
          } catch {
            // ignore failed fetches
          } finally {
            resolvingIdsRef.current.delete(id);
          }
        })
      );
      if (Object.keys(results).length) {
        setResolvedItemsById((prev) => ({ ...prev, ...results }));
      }
    };

    doFetch();
  }, [
    selectedValues,
    optionsData,
    valueKey,
    apiUrl,
    fetchItemById,
    resolvedItemsById,
  ]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isServerMode) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight + 50 &&
      hasMore &&
      !loadingMore
    ) {
      fetchOptions();
    }
  };

  const isServerMode = Boolean(apiUrl);
  const data: Option[] = useMemo(() => {
    const base = Array.isArray(options) ? options : [];
    const merged = [...base, ...optionsData];
    
    // Add grouped options to the merged data
    if (groupedOptions) {
      groupedOptions.forEach(group => {
        merged.push(...group.options);
      });
    }
    
    const map = new Map<string, Option>();
    for (const it of merged) {
      const key = String(it[valueKey]);
      if (!map.has(key)) map.set(key, it);
    }
    return Array.from(map.values());
  }, [options, optionsData, groupedOptions, valueKey]);

  // Filter data based on search
  const filteredData: Option[] = useMemo(() => {
    if (isServerMode) return data;
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return data;
    const keys: string[] = Array.isArray(titleKey) ? titleKey : [titleKey];
    return data.filter((item) => {
      for (const k of keys) {
        const v = item[k];
        if (v != null && String(v).toLowerCase().includes(q)) return true;
      }
      const vv = item[valueKey];
      return vv != null && String(vv).toLowerCase().includes(q);
    });
  }, [data, debouncedSearch, titleKey, valueKey, isServerMode]);

  const groupedData: GroupedOption[] = useMemo(() => {
    if (!groupedOptions) return [];
    return groupedOptions.map(group => ({
      ...group,
      options: group.options.filter(item => {
        const q = debouncedSearch.trim().toLowerCase();
        if (!q) return true;
        const keys: string[] = Array.isArray(titleKey) ? titleKey : [titleKey];
        for (const k of keys) {
          const v = item[k];
          if (v != null && String(v).toLowerCase().includes(q)) return true;
        }
        const vv = item[valueKey];
        return vv != null && String(vv).toLowerCase().includes(q);
      })
    })).filter(group => group.options.length > 0);
  }, [groupedOptions, debouncedSearch, titleKey, valueKey]);

  const isDisabled = disabled;

  const knownMap = useMemo(() => {
    const map = new Map<string, Option>();
    data.forEach((it) => map.set(String(it[valueKey]), it));
    
    // Add grouped options to the map
    if (groupedOptions) {
      groupedOptions.forEach(group => {
        group.options.forEach(item => {
          map.set(String(item[valueKey]), item);
        });
      });
    }
    
    Object.entries(resolvedItemsById).forEach(([id, it]) => map.set(id, it));
    return map;
  }, [data, groupedOptions, resolvedItemsById, valueKey]);

  const buildSelectedObjects = useCallback((): Option[] => {
    return selectedValues.map(
      (id) => knownMap.get(id) ?? ({ [valueKey]: id } as Option)
    );
  }, [knownMap, selectedValues, valueKey]);

  const getErrorColorClasses = () => {
    if (error) {
      return {
        contained:
          "border-red-500 bg-red-50 text-red-900 hover:bg-red-100 focus:ring-2 focus:ring-red-300",
        outlined:
          "border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600 focus:ring-2 focus:ring-red-300",
        text: "text-red-600 hover:text-red-800 focus:ring-2 focus:ring-red-300",
      };
    }
    return colorMap[color] || colorMap.primary;
  };

  const colorClasses = getErrorColorClasses()[variant];

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const getCustomWidthStyle = () => {
    if (fullWidth) return "w-full";
    if (width) {
      return "";
    }
    return "min-w-[400px] w-auto";
  };

  const getInlineWidthStyle = () => {
    if (fullWidth) return {};
    if (width) {
      if (typeof width === "number") {
        return { width: `${width}px` };
      }
      return { width };
    }
    return {};
  };

  const commonClassNames = [
    `${getCustomWidthStyle()} cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none border`,
    colorClasses,
    sizeClasses[size],
    isDisabled && "opacity-50 cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = async (selectedValue: string) => {
    const getKnownMap = (): Map<string, Option> => {
      const map = new Map<string, Option>();
      data.forEach((it) => map.set(String(it[valueKey]), it));
      Object.entries(resolvedItemsById).forEach(([id, it]) => map.set(id, it));
      return map;
    };

    const fetchMissingByIds = async (
      ids: string[]
    ): Promise<Record<string, Option>> => {
      const known = getKnownMap();
      const missing = ids.filter((id) => !known.has(id));
      if (missing.length === 0) return {};
      const newlyFetched: Record<string, Option> = {};
      await Promise.all(
        missing.map(async (id) => {
          try {
            let item: Option | null = null;
            if (fetchItemById) {
              item = await fetchItemById(id);
            } else if (apiUrl) {
              const endpoint = `${apiUrl.replace(
                /\/$/,
                ""
              )}/${encodeURIComponent(id)}`;
              const resp = await fetch(endpoint);
              if (resp.ok) {
                const json = await resp.json();
                item =
                  json && typeof json === "object" ? (json as Option) : null;
              }
            }
            if (item && (item as Option)[valueKey] != null) {
              newlyFetched[String(item[valueKey] as string | number)] = item;
            }
          } catch {
            // ignore
          }
        })
      );
      if (Object.keys(newlyFetched).length) {
        setResolvedItemsById((prev) => ({ ...prev, ...newlyFetched }));
      }
      return newlyFetched;
    };

    if (multiple) {
      const isAlreadySelected = selectedValues.includes(selectedValue);
      const isLocked = lockedIds.has(selectedValue);
      const newSelectedValues = isAlreadySelected
        ? isLocked
          ? selectedValues
          : selectedValues.filter((v) => v !== selectedValue)
        : [...selectedValues, selectedValue];
      setSelectedValues(newSelectedValues);

      await fetchMissingByIds(newSelectedValues);
    } else {
      setSelectedValues([selectedValue]);
      await fetchMissingByIds([selectedValue]);
      setIsOpen(false);
    }
  };

  const handleRemove = (valueToRemove: string) => {
    const newSelectedValues = selectedValues.filter((v) => v !== valueToRemove);
    setSelectedValues(newSelectedValues);
  };

  useEffect(() => {
    if (!onChange) return;
    const idsKey = selectedValues.join("|");
    if (idsKey === lastEmittedIdsRef.current) return;
    const known = new Map<string, Option>();
    data.forEach((it) => known.set(String(it[valueKey]), it));
    Object.entries(resolvedItemsById).forEach(([id, it]) => known.set(id, it));
    const selectedObjects = selectedValues.map((id) => {
      const found = known.get(id);
      return found ?? ({ [valueKey]: id } as Option);
    });
    lastEmittedIdsRef.current = idsKey;
    if (multiple) onChange(selectedObjects);
    else if (selectedObjects[0]) onChange(selectedObjects[0]);
  }, [selectedValues, data, resolvedItemsById, multiple, onChange, valueKey]);

  const getTitleFromItem = (item: Option): string => {
    if (Array.isArray(titleKey)) {
      return [...titleKey]
        .reverse()
        .map((key) => String(item[key] ?? ""))
        .join("  ");
    }
    return String(item[titleKey] ?? "");
  };

  const getSelectedTitles = () => {
    return selectedValues.map((value) => {
      const item = knownMap.get(value);
      return item ? getTitleFromItem(item) : value;
    });
  };

  const getDisplayItems = () => {
    const titles = getSelectedTitles();
    const max = Math.max(0, Math.min(visibleChipCount, titles.length));
    return { visible: titles.slice(0, max), count: titles.length - max };
  };

  useEffect(() => {
    const recompute = () => {
      const container = chipsContainerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;
      const available = container.clientWidth;
      if (available <= 0) return;
      const chipNodes = Array.from(
        measure.querySelectorAll('[data-chip="true"]')
      ) as HTMLElement[];
      const indicatorNode = measure.querySelector(
        '[data-indicator="true"]'
      ) as HTMLElement | null;
      let used = 0;
      let count = 0;
      const gap = 4;
      const total = chipNodes.length;
      for (let i = 0; i < total; i += 1) {
        const chipWidth = chipNodes[i].offsetWidth;
        const nextUsed = (count === 0 ? 0 : used + gap) + chipWidth;
        const remainingCount = total - (i + 1);
        const needIndicator = remainingCount > 0;
        let indicatorWidth = 0;
        if (needIndicator && indicatorNode) {
          indicatorNode.textContent = `... +${remainingCount}`;
          indicatorWidth = indicatorNode.offsetWidth;
        }
        const totalWithIndicator = needIndicator
          ? nextUsed + (count === 0 ? 0 : gap) + indicatorWidth
          : nextUsed;
        if (totalWithIndicator <= available) {
          used = nextUsed;
          count += 1;
        } else {
          break;
        }
      }
      setVisibleChipCount(count);
    };

    const raf = requestAnimationFrame(recompute);
    const raf2 = requestAnimationFrame(recompute);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(recompute)
        : null;
    const chipsEl = chipsContainerRef.current;
    if (ro && chipsEl) ro.observe(chipsEl);
    window.addEventListener("resize", recompute);
    return () => {
      if (ro && chipsEl) ro.unobserve(chipsEl as Element);
      window.removeEventListener("resize", recompute);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf2);
    };
  }, [selectedValues, renderSelectedValue]);

  useEffect(() => {
    const updatePosition = () => {
      const el = indicatorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTooltipPosition({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [selectedValues, visibleChipCount]);

  return (
    <div className={clsx(fullWidth && "w-full")} style={getInlineWidthStyle()}>
      {label && (
        <label
          htmlFor={controlId}
          id={`${controlId}-label`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && (
            <span
              className="text-red-500 ml-1"
              data-testid="select-required-asterisk"
            >
              *
            </span>
          )}
        </label>
      )}

      <div
        className={clsx("relative", fullWidth && "w-full")}
        style={getInlineWidthStyle()}
        ref={selectRef}
      >
        <button
          id={controlId}
          name={name}
          type="button"
          aria-controls={`${controlId}-listbox`}
          aria-labelledby={label ? `${controlId}-label` : undefined}
          aria-describedby={error ? `${controlId}-error` : undefined}
          className={clsx(
            commonClassNames,
            isOpen && "ring-2 ring-blue-300",
            error && "border-red-500"
          )}
          style={getInlineWidthStyle()}
          onClick={handleToggle}
          disabled={isDisabled}
          data-testid="select-toggle"
        >
          <div
            ref={chipsContainerRef}
            className="flex flex-nowrap overflow-hidden gap-1 items-center min-h-[20px] flex-1"
          >
            {multiple ? (
              selectedValues.length > 0 ? (
                <>
                  {(() => {
                    const { visible, count } = getDisplayItems();
                    return (
                      <>
                        {visible.map((title, index) => (
                          <span
                            key={selectedValues[index]}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                            data-chip="true"
                          >
                            {renderSelectedValue
                              ? renderSelectedValue(
                                  buildSelectedObjects()[index]
                                )
                              : title}
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!lockedIds.has(selectedValues[index])) {
                                  handleRemove(selectedValues[index]);
                                }
                              }}
                              className="hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (!lockedIds.has(selectedValues[index])) {
                                    handleRemove(selectedValues[index]);
                                  }
                                }
                              }}
                            >
                              ×
                            </span>
                          </span>
                        ))}
                        {count > 0 && (
                          <span
                            ref={indicatorRef}
                            className="group bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full cursor-pointer"
                            data-indicator="true"
                            onMouseEnter={() => setIsIndicatorHovered(true)}
                            onMouseLeave={() => setIsIndicatorHovered(false)}
                          >
                            ... +{count}
                          </span>
                        )}
                      </>
                    );
                  })()}
                </>
              ) : (
                <span className="text-gray-500">
                  {editMode ? "No items selected" : placeholder || "Select options..."}
                </span>
              )
            ) : (
              <span>
                {selectedValues.length > 0
                  ? renderSelectedValue
                    ? renderSelectedValue(buildSelectedObjects()[0])
                    : getSelectedTitles()[0]
                  : editMode
                  ? "No option selected"
                  : placeholder || "Select an option"}
              </span>
            )}
          </div>
          {multiple && selectedValues.length > 0 && (
            <div
              ref={measureRef}
              className="absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none"
            >
              <div className="flex flex-nowrap gap-1 items-center">
                {getSelectedTitles().map((title, index) => (
                  <span
                    key={`measure-${selectedValues[index]}`}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    data-chip="true"
                  >
                    {renderSelectedValue
                      ? renderSelectedValue(buildSelectedObjects()[index])
                      : title}
                    <span className="w-4 h-4" />
                  </span>
                ))}
                <span
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  data-indicator="true"
                >
                  ... +0
                </span>
              </div>
            </div>
          )}
          {(isIndicatorHovered || alwaysShowOverflowTooltip) &&
            (() => {
              const hiddenObjects = buildSelectedObjects().slice(
                getDisplayItems().visible.length
              );
              if (hiddenObjects.length === 0) return null;
              const content = (
                <div
                  className="fixed z-[1000] bg-gray-900 text-white text-xs rounded px-3 py-2 shadow-lg"
                  style={{
                    top: `${tooltipPosition.top}px`,
                    left: `${tooltipPosition.left}px`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {hiddenObjects.map((obj, idx) => (
                    <div
                      key={idx}
                      className="whitespace-normal break-words py-0.5"
                    >
                      {renderSelectedValue ? (
                        renderSelectedValue(obj)
                      ) : (
                        <>{getTitleFromItem(obj)}</>
                      )}
                    </div>
                  ))}
                </div>
              );
              const portalRoot = document.body;
              return createPortal(content, portalRoot);
            })()}
          <FaChevronDown
            className={clsx(
              "w-4 h-4 ml-2 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div
            className={clsx(
              "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
            )}
          >
            {searchable && (
              <div className="p-2 border-b border-gray-200 bg-gray-50">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            {(dropdownHeader || onAddNew) && (
              <div className="p-2 border-b border-gray-200 bg-gray-50">
                {dropdownHeader ? (
                  dropdownHeader
                ) : (
                  <button
                    type="button"
                    className="w-full text-blue-600 border border-blue-200 hover:bg-blue-50 rounded px-2 py-1 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddNew?.();
                    }}
                    data-testid="select-add-new"
                  >
                    {addNewLabel || "Add new"}
                  </button>
                )}
              </div>
            )}
            <div
              ref={dropdownRef}
              onScroll={handleScroll}
              id={`${controlId}-listbox`}
              className={clsx("max-h-60 overflow-auto")}
            >
              {loading && (
                <div className="px-3 py-2 text-gray-500">Loading...</div>
              )}
              
                             {/* Render grouped options if available */}
               {groupedData.length > 0 && !loading ? (
                 groupedData.map((group, groupIndex) => (
                   <div key={`group-${groupIndex}`} className="group">
                     <div className={clsx(
                       "px-3 py-2 text-sm font-medium border-b border-gray-200 sticky top-0 z-10",
                       group.disabled 
                         ? "bg-gray-50 text-gray-400 cursor-not-allowed" 
                         : "bg-gray-100 text-gray-700"
                     )}>
                       {group.label}
                       
                     </div>
                     {group.options.map((item: Option) => {
                       const itemValue = String(item[valueKey]);
                       const isSelected = selectedValues.includes(itemValue);
                       const isLocked = lockedIds.has(itemValue);
                       const isItemDisabled = item.disabled || group.disabled;
                       const defaultClass = clsx(
                         "px-3 py-2 flex items-center justify-between transition-colors duration-150",
                         isItemDisabled 
                           ? "opacity-50 cursor-not-allowed text-gray-400" 
                           : "cursor-pointer hover:bg-gray-100",
                         isSelected && !isItemDisabled && "bg-blue-50 text-blue-600"
                       );
                       const className = getOptionClassName
                         ? getOptionClassName(item, { isSelected })
                         : defaultClass;
                       return (
                         <div
                           key={String(itemValue)}
                           className={className}
                           onClick={() => {
                             if (isSelected && isLocked) return;
                             if (isItemDisabled) return;
                             handleSelect(itemValue);
                           }}
                         >
                           {renderOption ? (
                             renderOption(item, { isSelected })
                           ) : (
                             <>
                               <span
                                 className="truncate max-w-[400px] block"
                                 title={getTitleFromItem(item)}
                               >
                                 {getTitleFromItem(item).length > 100
                                   ? getTitleFromItem(item).slice(0, 100) + "..."
                                   : getTitleFromItem(item)}

                               </span>
                               {isSelected && !isItemDisabled && (
                                 <FaCheck className="w-4 h-4 text-blue-600" />
                               )}
                             </>
                           )}
                         </div>
                       );
                     })}
                   </div>
                 ))
               ) : (
                <>
                  {(filteredData?.length ?? 0) === 0 && !loading && (
                    <div className="px-3 py-2 text-gray-400">No options</div>
                  )}
                                     {filteredData?.map((item: Option) => {
                     const itemValue = String(item[valueKey]);
                     const isSelected = selectedValues.includes(itemValue);
                     const isLocked = lockedIds.has(itemValue);
                     const isItemDisabled = item.disabled;
                     const defaultClass = clsx(
                       "px-3 py-2 flex items-center justify-between transition-colors duration-150",
                       isItemDisabled 
                         ? "opacity-50 cursor-not-allowed text-gray-400" 
                         : "cursor-pointer hover:bg-gray-100",
                       isSelected && !isItemDisabled && "bg-blue-50 text-blue-600"
                     );
                     const className = getOptionClassName
                       ? getOptionClassName(item, { isSelected })
                       : defaultClass;
                     return (
                       <div
                         key={String(itemValue)}
                         className={className}
                         onClick={() => {
                           if (isSelected && isLocked) return;
                           if (isItemDisabled) return;
                           handleSelect(itemValue);
                         }}
                       >
                        {renderOption ? (
                          renderOption(item, { isSelected })
                        ) : (
                          <>
                                                           <span
                                 className="truncate max-w-[400px] block"
                                 title={getTitleFromItem(item)}
                               >
                                 {getTitleFromItem(item).length > 100
                                   ? getTitleFromItem(item).slice(0, 100) + "..."
                                   : getTitleFromItem(item)}
                               
                               </span>
                               {isSelected && !isItemDisabled && (
                                 <FaCheck className="w-4 h-4 text-blue-600" />
                               )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
              
              {isServerMode && loadingMore && (
                <div className="px-3 py-2 text-gray-500">Loading more...</div>
              )}
              {isServerMode && !hasMore && data.length > 0 && (
                <div className="px-3 py-2 text-gray-400">No more options</div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600 flex items-center"
        >
          <FaExclamationCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
