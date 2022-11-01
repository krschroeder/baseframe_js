
export interface ICookieOptions {
    path?: string;
    expires?: number;
    secure?: boolean;
    sameSite?: 'SameSite' | 'Strict' | 'Lax';
}

export interface ICookies {
    set(cookieName: string, value: string, options: ICookieOptions): void;
    get(cookieName: string): string;
    remove(cookieName: string, pathToCookie: string, domain: string): void;
}

declare const cookies: ICookies;

export default cookies;