export const updateWithoutDuplicates = (newItem, oldList) => {
  // Validar que el nuevo elemento y la lista sean válidos
  if (!newItem || !newItem.id) return oldList; // Si el nuevo elemento no tiene `id`, devolver la lista sin cambios

  const repeatedLocation = oldList.find(
    (listItem) => listItem && listItem.id === newItem.id
  );

  if (repeatedLocation) {
    return oldList.map((listItem) =>
      listItem && listItem.id === newItem.id ? newItem : listItem
    );
  } else {
    return [newItem, ...oldList];
  }
};
