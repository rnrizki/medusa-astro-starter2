import { atom, computed } from "nanostores";
import type { StoreCart } from "@medusajs/types";

/**
 * Cart state management using Nanostores
 *
 * Atoms:
 * - $cart: The full cart object from Medusa
 * - $cartOpen: Whether the cart sidebar is visible
 *
 * Computed:
 * - $cartCount: Total number of items in cart
 * - $cartTotal: Formatted total price
 */

// =============================================================================
// Atoms
// =============================================================================

/**
 * The cart data from Medusa
 * null when no cart exists yet
 */
export const $cart = atom<StoreCart | null>(null);

/**
 * Whether the cart sidebar is open
 */
export const $cartOpen = atom<boolean>(false);

// =============================================================================
// Computed Values
// =============================================================================

/**
 * Total number of items in the cart
 * Sums up quantities of all line items
 */
export const $cartCount = computed($cart, (cart) => {
  if (!cart?.items) return 0;
  return cart.items.reduce((total, item) => total + item.quantity, 0);
});

/**
 * Cart total as a formatted string
 * Returns the cart's total amount with currency
 */
export const $cartTotal = computed($cart, (cart) => {
  if (!cart) return null;

  const total = cart.total ?? 0;
  const currencyCode = cart.currency_code ?? "usd";

  // Format the total as currency
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(total / 100); // Medusa stores amounts in cents
});

/**
 * Raw cart total in cents (for calculations)
 */
export const $cartTotalRaw = computed($cart, (cart) => {
  return cart?.total ?? 0;
});

// =============================================================================
// Actions
// =============================================================================

/**
 * Set the cart data
 */
export function setCart(cart: StoreCart | null) {
  $cart.set(cart);
}

/**
 * Open the cart sidebar
 */
export function openCart() {
  $cartOpen.set(true);
}

/**
 * Close the cart sidebar
 */
export function closeCart() {
  $cartOpen.set(false);
}

/**
 * Toggle the cart sidebar
 */
export function toggleCart() {
  $cartOpen.set(!$cartOpen.get());
}

/**
 * Clear the cart (set to null)
 */
export function clearCart() {
  $cart.set(null);
}
