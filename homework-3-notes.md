# Homework 3: Global State Management — Reflection

## State Architecture Analysis

### 1. **State Distribution by Tool**

- **TanStack Query** (Server State):
  - Product catalog data (`useProducts`)
  - Individual product details (`useProduct`)
  - Categories list (`useCategories`)
  - Search/filter parameters passed as query keys
  - Benefits: Automatic caching, background refetching, stale-while-revalidate

- **React Context** (Feature-Scoped UI State):
  - Cart sidebar visibility (`isOpen`)
  - Cart items array with quantities
  - Cart CRUD operations (add, remove, update, clear)
  - Scoped to cart feature, shared across Header + CartSidebar + ProductCard

- **Zustand** (Global Client State):
  - Toast notifications (transient alerts)
  - Theme preference (light/dark mode)
  - Benefits: Minimal boilerplate, built-in persistence middleware, no Provider needed

- **Local useState** (Component-Specific State):
  - Search input text (ProductsList page)
  - Loading/hover states in UI components
  - Form inputs before submission

### 2. **Why Global State Was the Right Choice**

**Cart Items (Context)**:
- Needed across multiple disconnected components (Header badge, CartSidebar panel, ProductCard buttons)
- Would require "prop drilling" through 3-4 levels if using local state
- Single source of truth prevents sync issues between cart display and badge counter

**Theme (Zustand)**:
- Must persist across sessions → localStorage integration
- Affects every component (CSS variables on document root)
- Zustand's `persist` middleware made this trivial vs manual localStorage management

**Notifications (Zustand)**:
- Triggered from anywhere (API errors, user actions)
- Rendered in one place (ToastHost at app root)
- Queue management (multiple toasts, auto-dismiss) needs centralized logic

### 3. **Why Local State Was Better**

**Search Input Text**:
- Only ProductsList page cares about current input value
- No other component needs to read/modify it
- Debouncing happens locally before triggering TanStack Query refetch
- Making this global would pollute state with component-specific details

**Product Card Hover Effects**:
- Purely visual, component-internal concern
- No other component needs hover state of unrelated cards
- Local useState keeps logic encapsulated

### 4. **localStorage Integration Strategy**

- **Custom `useLocalStorage` Hook**:
  - Generic reusable abstraction for any localStorage needs
  - Handles JSON serialization/deserialization automatically
  - Synchronizes state changes back to localStorage via `useEffect`
  - Used by CartProvider for cart items + isOpen state

- **Zustand `persist` Middleware**:
  - Theme store uses built-in persistence (simpler than custom hook)
  - Automatically syncs on every state change
  - Handles hydration on app load

**Why This Split?**:
- Context needed custom persistence logic anyway (complex cart structure)
- Zustand has first-class persistence support → use it
- `useLocalStorage` hook remains useful for future Context-based features

### 5. **Server State vs Client State Separation**

**Clear Boundary**:
- TanStack Query owns ALL data fetched from API (products, categories)
- Never duplicated into Context/Zustand/useState
- Components read from Query hooks, not from global stores

**Why This Matters**:
- Avoids stale data bugs (single source of truth)
- Query invalidation works correctly (no manual sync needed)
- Cache deduplication works (multiple components calling `useProducts` share cache)

### 6. **State Composition Patterns**

**Dependent Queries** (ProductDetail page):
```tsx
const { data: product } = useProduct(id);  // Fetches when id available
```
- TanStack Query's `enabled` option prevents fetching without valid ID
- No need for manual loading orchestration

**Derived State** (Cart total calculation):
- `getTotalItems()` and `getTotalPrice()` computed on-the-fly
- Not stored in state → always correct, no sync issues

### 7. **Error Handling Architecture**

- **TanStack Query Errors** → Toast Notifications:
  - `useEffect` watching `isError` state in ProductsList
  - Calls `addNotification({ type: 'error' })` on fetch failures
  - User sees error, TanStack Query handles retry logic automatically

- **Success Feedback** → Toast Notifications:
  - "Item added to cart" success toasts
  - 3-second auto-dismiss for non-critical feedback

### 8. **Performance Considerations**

**Why Context for Cart Instead of Zustand?**:
- Cart updates are frequent but affect few components
- Context prevents unnecessary rerenders in unrelated parts of app
- Zustand would work but offers no advantage here (cart is feature-scoped, not truly global)

**TanStack Query Optimization**:
- 5-minute `staleTime` reduces unnecessary refetches
- Background refetching keeps data fresh without loading spinners
- `gcTime` (10 min) keeps unused data cached for quick back-navigation

### 9. **Architecture Trade-offs**

**What Went Well**:
- Clear separation of concerns (server/client/local state)
- Easy to test (stores/hooks isolated from components)
- Minimal prop drilling
- Type-safe (TypeScript interfaces for all state shapes)

**What Could Be Improved**:
- Could extract cart logic into Zustand (would simplify Provider setup)
- Toast queue could have max-limit to prevent UI overflow
- Theme could control more than just colors (font sizes, spacing?)

### 10. **Key Learnings**

1. **Start Local, Go Global Only When Needed**: Search input started local, stayed local. Cart started in one component, moved to Context when Header needed it.

2. **Let Libraries Handle Their Domain**: TanStack Query for server data, localStorage for persistence, Zustand for global client state. Don't reinvent these.

3. **Persistence ≠ Global State**: Cart is persisted but Context-scoped. Theme is global AND persisted. These are orthogonal concerns.

4. **Transient vs Durable State**: Notifications are global but NOT persisted (meaningless after refresh). Theme is both. Choose persistence based on user expectations.

5. **Type Safety Everywhere**: `Notification` interface, `CartItem` interface, `Product` type from API. TypeScript caught bugs during refactoring (e.g., mismatched property names between store and components).

---

## Summary

This homework demonstrated real-world state management complexity:
- **4 different state tools** for 4 different state types
- **Composition** of multiple state sources (Query + Context, Context + localStorage)
- **Architectural decisions** based on scope, persistence, and performance needs

The key insight: **There's no "best" state tool — only the right tool for each job.**
