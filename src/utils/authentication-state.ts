export enum AuthenticationStatus {
  Unknown,
  Authenticated,
  Refreshing,
  Error
}

export class AuthenticationState {
  private readonly storageKey = "monq.auth.token";

  public status: AuthenticationStatus = AuthenticationStatus.Unknown;

  public get token(): string | undefined {
    return this.getStoredToken();
  }

  public set token(value: string | undefined) {
    this.setStoredToken(value);
  }

  private getStoredToken(): string | undefined {
    return localStorage.getItem(this.storageKey) ?? undefined;
  }

  private setStoredToken(token?: string): void {
    if (token == null) localStorage.removeItem(this.storageKey);
    else localStorage.setItem(this.storageKey, token);
  }
}
