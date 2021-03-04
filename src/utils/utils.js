export const toDirectory = (dir, pathSplitted, data) => {
    if (pathSplitted.length === 0)
        return {
            name: data.id.split("/").slice(-1)[0],
            data,
        };

    const findChild = dir.children?.find((el) => el.name === pathSplitted[0]);
    const newEl = toDirectory(
        findChild ? findChild : { name: pathSplitted[0], children: [] },
        pathSplitted.slice(1),
        data
    );
    if (!findChild) dir.children.push(newEl);
    else dir.children.splice(dir.children.indexOf(findChild), 1, newEl);

    return dir;
};

export const metricsArrToDir = (arr, dir) => {
    for (let el of arr) toDirectory(dir, el.id.split("/"), el);
    return dir;
};

export const parseSelect = (options) => {
    return options.map((el) => ({
        key: el.split(" ")[0],
        text: el,
        value: el,
    }));
};

export const genFormsList = (metrics = [], selectedDir = []) => {
    const newMetrics = metrics.map((el) => {
        return { ...el, id: el.id.slice(-1) === "/" ? el.id : `${el.id}/` };
    });
    const newSelectedDir = selectedDir.map((el) => `${el}/`);

    return newSelectedDir.reduce(
        (acc, id) => acc.concat(newMetrics.map((q) =>
            q.id.includes(id) && !!!acc.find((el) => el === q.id.slice(0, -1))
                ? { ...q, id: q.id.slice(0, -1) }
                : null
        )), []).filter(el => el);
};

export const kebabCase = (value) => {
  return value
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
}