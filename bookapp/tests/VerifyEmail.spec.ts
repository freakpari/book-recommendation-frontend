import { test, expect } from '@playwright/test';

test.describe('VerifyEmail page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/verifyEmail'); // آدرس باید با محیط شما مطابقت داشته باشد
    });

    test('should render email input and button', async ({ page }) => {
        await expect(page.getByPlaceholder('ایمیل')).toBeVisible();
        await expect(page.getByRole('button', { name: 'ادامه' })).toBeVisible();
    });

    test('should show error notification on invalid email', async ({ page }) => {
        const emailInput = page.getByPlaceholder('ایمیل');
        const submitButton = page.getByRole('button', { name: 'ادامه' });

        await emailInput.fill('not-an-email');
        await submitButton.click();

        // چون نوتیفیکیشن انیمیشنی است، از انتظار همراه با timeout استفاده می‌کنیم
        const notification = page.locator('text=لطفاً یک ایمیل معتبر وارد کنید.');
        await expect(notification).toBeVisible({ timeout: 3000 });
    });

    test('should go to /verifyPass after valid email', async ({ page }) => {
        // برای جلوگیری از تماس واقعی به API، route mocking لازم است
        await page.route('**/api/auth/send-verify-code-pass', route =>
            route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        );

        await page.getByPlaceholder('ایمیل').fill('test@example.com');
        await page.getByRole('button', { name: 'ادامه' }).click();

        await expect(page).toHaveURL(/\/verifyPass/);
    });
});
