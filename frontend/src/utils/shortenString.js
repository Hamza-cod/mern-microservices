export default function shortenString(str, maxLength = 10) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '..';
    }
    return str;
}