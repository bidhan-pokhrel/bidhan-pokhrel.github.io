/**
 * auth.js — Authentication Manager
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles login, logout, session checking, and credential changes.
 *
 * Storage keys (localStorage):
 *   bp_auth_setup          → "1" once defaults have been written
 *   bp_auth_username       → stored username string
 *   bp_auth_password_hash  → hex SHA-256 of the password
 *
 * Session (sessionStorage):
 *   bp_session             → "1" when logged in (cleared on tab close)
 *
 * Default credentials:
 *   username : bidhan
 *   password : Admin@2024
 * ─────────────────────────────────────────────────────────────────────────────
 */

const AuthManager = (() => {

  // ── Storage key constants ──────────────────────────────────────────────────
  const KEY_SETUP    = 'bp_auth_setup';
  const KEY_USER     = 'bp_auth_username';
  const KEY_HASH     = 'bp_auth_password_hash';
  const KEY_SESSION  = 'bp_session';

  // ── Default credentials ────────────────────────────────────────────────────
  const DEFAULT_USERNAME = 'bidhan';
  const DEFAULT_PASSWORD = 'Admin@2024';

  // ── SHA-256 helper (Web Crypto API — no external library needed) ───────────
  /**
   * Returns a lowercase hex SHA-256 digest of the given string.
   * @param {string} text
   * @returns {Promise<string>}
   */
  async function sha256(text) {
    const encoder = new TextEncoder();
    const data    = encoder.encode(text);
    const hashBuf = await crypto.subtle.digest('SHA-256', data);
    const bytes   = Array.from(new Uint8Array(hashBuf));
    return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  /**
   * init()
   * Called once on page load.
   * Writes default credentials to localStorage if not yet set up.
   */
  async function init() {
    if (!localStorage.getItem(KEY_SETUP)) {
      const hash = await sha256(DEFAULT_PASSWORD);
      localStorage.setItem(KEY_USER,  DEFAULT_USERNAME);
      localStorage.setItem(KEY_HASH,  hash);
      localStorage.setItem(KEY_SETUP, '1');
    }
  }

  /**
   * login(username, password)
   * Hashes the supplied password and compares against the stored hash.
   * On success, writes session flag to sessionStorage.
   * @returns {Promise<{ ok: boolean, error?: string }>}
   */
  async function login(username, password) {
    const storedUser = localStorage.getItem(KEY_USER)  || '';
    const storedHash = localStorage.getItem(KEY_HASH)  || '';

    // Trim whitespace to be forgiving on typing
    if (username.trim().toLowerCase() !== storedUser.toLowerCase()) {
      return { ok: false, error: 'Invalid username or password.' };
    }

    const hash = await sha256(password);
    if (hash !== storedHash) {
      return { ok: false, error: 'Invalid username or password.' };
    }

    // Mark session as active
    sessionStorage.setItem(KEY_SESSION, '1');
    return { ok: true };
  }

  /**
   * logout()
   * Clears the active session.
   */
  function logout() {
    sessionStorage.removeItem(KEY_SESSION);
  }

  /**
   * isLoggedIn()
   * @returns {boolean}
   */
  function isLoggedIn() {
    return sessionStorage.getItem(KEY_SESSION) === '1';
  }

  /**
   * changeUsername(newUsername, currentPassword)
   * Verifies the current password before updating the username.
   * @returns {Promise<{ ok: boolean, error?: string }>}
   */
  async function changeUsername(newUsername, currentPassword) {
    const trimmed = newUsername.trim();
    if (!trimmed) return { ok: false, error: 'Username cannot be empty.' };

    // Verify current password first
    const storedHash = localStorage.getItem(KEY_HASH) || '';
    const hash       = await sha256(currentPassword);
    if (hash !== storedHash) {
      return { ok: false, error: 'Current password is incorrect.' };
    }

    localStorage.setItem(KEY_USER, trimmed);
    return { ok: true };
  }

  /**
   * changePassword(newPassword, currentPassword)
   * Verifies the current password, then stores the new hash.
   * @returns {Promise<{ ok: boolean, error?: string }>}
   */
  async function changePassword(newPassword, currentPassword) {
    if (!newPassword || newPassword.length < 6) {
      return { ok: false, error: 'New password must be at least 6 characters.' };
    }

    const storedHash = localStorage.getItem(KEY_HASH) || '';
    const oldHash    = await sha256(currentPassword);
    if (oldHash !== storedHash) {
      return { ok: false, error: 'Current password is incorrect.' };
    }

    const newHash = await sha256(newPassword);
    localStorage.setItem(KEY_HASH, newHash);
    return { ok: true };
  }

  /**
   * getUsername()
   * Convenience getter so other modules can display the current username.
   * @returns {string}
   */
  function getUsername() {
    return localStorage.getItem(KEY_USER) || DEFAULT_USERNAME;
  }

  // ── Expose public methods ──────────────────────────────────────────────────
  return {
    init,
    login,
    logout,
    isLoggedIn,
    changeUsername,
    changePassword,
    getUsername,
  };

})();
