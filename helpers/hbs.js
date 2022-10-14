import moment from "moment";

export function formatDate(date, format) {
    return moment(date).format(format);
}

export function truncate(str, len) {
    if (str.length > len && str.length > 0) {
        let new_str = str + " ";
        new_str = str.substr(0, len);
        new_str = str.substr(0, new_str.lastIndexOf(" "));
        new_str = new_str.length > 0 ? new_str : str.substr(0, len);
        return new_str + "...";
    }
    return str;
}

export function stripTags(input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
}
