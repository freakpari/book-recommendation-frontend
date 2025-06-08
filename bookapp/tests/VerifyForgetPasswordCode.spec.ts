import { test, expect } from "@playwright/test";

test.describe("VerifyForgetPasswordCode", () => {
    test.beforeEach(async ({ page }) => {
        // Mock کردن API verify-code-pass
        await page.route("**/api/auth/verify-code-pass", async (route) => {
            const data = await route.request().postDataJSON();
            if (data.code === "123456") {
                route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
            } else {
                route.fulfill({ status: 400, body: JSON.stringify({ message: "کد وارد شده اشتباه است" }) });
            }
        });

        // Mock کردن API send-verify-code-pass
        await page.route("**/api/auth/send-verify-code-pass", async (route) => {
            route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
        });

        // تنظیم ایمیل تست در localStorage
        await page.addInitScript(() => {
            window.localStorage.setItem("test_email", "test@example.com");
        });

        await page.goto("/verifyPass");
    });

    test("نمایش اولیه صفحه و وجود 6 فیلد OTP", async ({ page }) => {
        await expect(page.getByText("فراموشی رمز عبور")).toBeVisible();
        await expect(page.locator('input[type="text"]')).toHaveCount(6);
    });

    test("نمایش ارور هنگام کلیک روی دکمه بدون پر کردن فیلدها", async ({ page }) => {
        await page.getByRole("button", { name: "ادامه" }).click();
        const toast = page.getByTestId("error-toast");
        await expect(toast).toContainText("لطفا تمام فیلدها را پر کنید.");
    });

    test("کد اشتباه وارد شود و ارور دریافت شود", async ({ page }) => {
        const otp = "999999";
        const inputs = page.locator('input[type="text"]');
        for (let i = 0; i < otp.length; i++) {
            await inputs.nth(i).fill(otp[i]);
        }

        const toast = page.getByTestId("error-toast");
        await expect(toast).toContainText("کد وارد شده اشتباه است");
    });

    test("کد صحیح وارد شود و به صفحه setNewPass منتقل شود", async ({ page }) => {
        const otp = "123456";
        const inputs = page.locator('input[type="text"]');
        for (let i = 0; i < otp.length; i++) {
            await inputs.nth(i).fill(otp[i]);
        }

        // بررسی اینکه به صفحه جدید منتقل شده‌ایم
        await expect(page).toHaveURL(/.*setNewPass/);
    });

    test("ارسال مجدد کد و مشاهده پیام موفقیت", async ({ page }) => {
        await page.getByRole("button", { name: "ارسال مجدد کد" }).click();
        const toast = page.getByTestId("success-toast");
        await expect(toast).toContainText("کد جدید با موفقیت ارسال شد");
    });
});
