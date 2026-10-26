import { Injectable, computed, signal } from '@angular/core';

export type Role = 'admin' | 'user';

export interface User {
    username: string;
    role: Role;
}

@Injectable({
    providedIn: 'root',
})
export class Auth {
    private readonly storageKey = 'auth-user';

    private readonly currentUser = signal<User | null>(this.restoreSession());

    readonly user = this.currentUser.asReadonly();
    readonly isAuthenticated = computed(() => this.currentUser() !== null);

    login(username: string, password: string): boolean {
        const name = username.trim();

        if (
            password !== '123' ||
            (name !== 'admin' && name !== 'operador')
        ) {
            return false;
        }

        const user: User = {
            username: name,
            role: name === 'admin' ? 'admin' : 'user',
        };

        sessionStorage.setItem(this.storageKey, JSON.stringify(user));
        this.currentUser.set(user);

        return true;
    }

    logout(): void {
        sessionStorage.removeItem(this.storageKey);
        this.currentUser.set(null);
    }

    private restoreSession(): User | null {
        const stored = sessionStorage.getItem(this.storageKey);

        if (!stored) {
            return null;
        }

        try {
            const user: User = JSON.parse(stored);

            if (
                user &&
                typeof user.username === 'string' &&
                (user.role === 'admin' || user.role === 'user')
            ) {
                return user;
            }
        } catch {
            // Si la sesión guardada no es válida, se descarta.
        }

        sessionStorage.removeItem(this.storageKey);
        return null;
    }
}