export const getList = () => {
    return [
        {
            value: 1,
            label: this.$t("apple") // 列表中的数据支持多语言
        },
        {
            value: 2,
            label: this.$t("banana")
        }
    ];
}