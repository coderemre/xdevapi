export const resJson = async (res: any, result: any) => {
  if (result) {
    res.status(201).send({ result: { ...result } || {} });
  } else {
    res
      .status(404)
      .send({ result: { error: true, messsage: "404 Not Found!" } });
  }
};

export const resError = async (res: any, result: any) => {
  res.status(404).send({ result: { error: true, messsage: result } });
};

export const dataControl = (res: any, data: any) => {
  if (Object.keys(data).length === 0) {
    return resError(res, "Eksik parametre!");
  } else {
    return true;
  }
};

export const objLenght = (obj: any) => {
  if (typeof obj !== "object") return 0;
  if (Object.keys(obj).length === 0) {
    return 0;
  } else {
    return Object.keys(obj).length;
  }
};

export const getFilter = (filterType: string) => {
  switch (filterType) {
    case "eq":
      return "=";
    case "like":
      return "LIKE";
    default:
      return false;
  }
};

export const isGate = (value: string) => {
  if (value === "AND" || value === "OR") {
    return true;
  } else {
    return false;
  }
};

export const findObjEdit = (find: any) => {
  let res: any = {};
  let filters: any = [];
  let gates: any = [];
  Object.entries(find).map(([key, value]: [key: any, value: any]) => {
    //isGate(key) && (res.gate = key);

    if (isGate(key)) {
      gates.push(key);
      res.gates = gates;
    }

    if (getFilter(key)) {
      filters.push({ key, value });
      res.filters = filters;
    } else {
      res.value = value;
    }
  });

  if (filters[filters.length - 1]) {
    filters[filters.length - 1].gate = "AND";
  }
  return res;
};

export const setFind = (find: any) => {
  if (!objLenght(find)) return false;
  let filters = [];
  let gates: any = [];
  let res: any;
  let resData = "";

  const recursiveFunc = () => {
    res = findObjEdit(res.value);
    res.gates && gates.push(...res.gates);
    res.filters && filters.push(...res.filters);
    if (objLenght(res.value)) {
      recursiveFunc();
    }
  };

  res = findObjEdit(find);
  res.gates && gates.push(...res.gates);
  res.filters && (filters = res.filters);
  objLenght(res.value) && recursiveFunc();
  resData = "(";

  if (Array.isArray(filters) && filters.length > 0) {
    let gatesIndex = 0;
    filters.map(async (item: any, index: number) => {
      let filter: any = "";
      let key: any = "";
      let value: any = "";
      filter = getFilter(item.key) + " ";
      key = Object.keys(item.value)[0] + " ";
      value = Object.values(item.value)[0];

      let _gate = index == filters.length - 1 ? ")" : gates[gatesIndex] + " ";
      if (typeof value === "string") value = "'" + value + "'";
      value += " ";
      if (item.gate && _gate != ")") {
        _gate = item.gate + " ";
        gatesIndex += 1;
        resData += key + filter + value + ") " + _gate + "(";
      } else {
        resData += key + filter + value + _gate;
      }
    });
  }
  console.log(resData);
  return resData;
};

export const rowsCount = async (coll: any, findCondition: object) => {
  let totalData = await coll.find(findCondition).execute();
  totalData = totalData.fetchAll ? totalData.fetchAll() : [];
  return totalData.length ? totalData.length : 0;
};
