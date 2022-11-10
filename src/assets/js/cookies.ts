
export interface ICookieOptions {
    path?: string;
    expires?: number;
    secure?: boolean;
	domain?: string;
    sameSite?: 'SameSite' | 'Strict' | 'Lax';
}

export interface ICookies {
    set(cookieName: string, value: string, options: ICookieOptions): void;
    get(cookieName: string): string;
    remove(cookieName: string, pathToCookie: string, domain: string): void;
}

const cookies: ICookies = {

	get(name) {
		const arg = name + "=";
		const alen = arg.length;
		const clen = document.cookie.length;

		let i = 0;
		while (i < clen) {
			let j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
				return getCookieVal(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break;
		}
		return "";
	},

	set(name, value, props = {}) {
		const d = new Date();
		d.setTime(d.getTime() + ((props.expires||0)*60*1000));

		const expires = props.expires ? d.toUTCString(): null;

		document.cookie = name + "=" + encodeURI(value) +
			((expires) ? "; expires=" + expires : "") +
			"; path=" + (props.path ? props.path : "/") +
			((props.domain) ? "; domain=" + props.domain : "") +
			((props.sameSite) ? "; sameSite=" + props.sameSite : "") +
			((props.secure || props.sameSite && props.sameSite.toLowerCase() === "none") ? "; secure" : "");
	},

	remove(name, path, domain) {
		if (this.get(name)) {
			document.cookie = name + "=" +
				((path) ? "; path=" + path : "") +
				((domain) ? "; domain=" + domain : "") +
				"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
	},

};

//utility
function getCookieVal(offset) {
	let endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return decodeURI(document.cookie.substring(offset, endstr));
}

export default cookies;

