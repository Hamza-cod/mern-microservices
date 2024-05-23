export default function shortenString(str, maxLength = 10,repWIth = "...") {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + repWIth;
    }
    return str;
}