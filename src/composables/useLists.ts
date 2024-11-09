export function useLists() {
    const formatOrder = (order: number): string => {
        if (order === 0) return '0';
        return order < 10 ? `0${order}` : `${order}`;
    };

    return { formatOrder };
}
