export function slugify(string: string) {
    return string
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-");
}
export function mergeShelfEntries(shelfEntries: any, shelfID: string) {
    if (!shelfEntries) {
        return;
    }
    const mergedInfo = [...shelfEntries]
        .sort((a, b) => {
            if (
                !a.collectionInfo.primaryShelf &&
                b.collectionInfo.primaryShelf
            ) {
                return -1;
            } else if (
                a.collectionInfo.primaryShelf &&
                !b.collectionInfo.primaryShelf
            ) {
                return 1;
            } else if (
                a.collectionInfo.sourceShelf !== shelfID &&
                b.collectionInfo.sourceShelf === shelfID
            ) {
                return -1;
            } else if (
                a.collectionInfo.sourceShelf === shelfID &&
                b.collectionInfo.sourceShelf !== shelfID
            ) {
                return 1;
            } else {
                return (
                    new Date(a.collectionInfo.dateModified).getTime() -
                    new Date(b.collectionInfo.dateModified).getTime()
                );
            }
        })
        .reduce((merged, entry) => {
            return { ...merged, ...entry };
        }, {});

    return { ...mergedInfo, shelfEntries };
}
