# HW04 – Selected features

Brief §5: automate the **same three web features selected in HW02**, one from each of Pools A, B and C. The HW02 Pool D feature (FR-10, mobile) is not used, because HW04 automates the web frontend.

Source of the selection: HW02 `features/picked-features.md` (repo `thhuon/hcmus-software-testing-hw02`). The group rule from HW02 still holds: each FR is taken by one member only, so the three features below do not duplicate any other member's selection.

## 1. Features to automate

| Slot | Pool | FR | Feature | Frontend | HW02 test cases (DT + BVA) | HW02 folder |
| --- | --- | --- | --- | --- | --- | --- |
| A | Pool A – Authentication, Categories, Products | FR-03 | Quên mật khẩu & Đặt lại mật khẩu (2 bước) – forgot password and reset (two steps) | Web `http://localhost:5173` | 34 + 10 = 44 | `features/fA-pool-A/` |
| B | Pool B – Shopping Cart and Checkout | FR-08 | Thanh toán – checkout | Web `http://localhost:5173` | 13 + 4 = 17 | `features/fB-pool-B/` |
| C | Pool C – Web Admin | FR-15 | Quản lý sản phẩm – product CRUD | Admin web `http://localhost:5174` | 27 + 9 = 36 | `features/fC-pool-C/` |

Each feature has at least 12 designed HW02 test cases, so the brief's minimum of **12 automated test cases per feature** (Task 1) can be taken from the HW02 domain testing and BVA tables.

## 2. Not used in HW04

| Slot | FR | Reason |
| --- | --- | --- |
| D | FR-10 – Trạng thái đơn hàng (order state machine), user cancel on the Mobile app | Brief §5: the Pool D (mobile) feature is not used in HW04. |
