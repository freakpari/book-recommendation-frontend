import { test, expect } from '@playwright/test';

test.describe('SignUp Component Tests', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        // Increase timeout for this hook
        testInfo.setTimeout(60000);

        try {
            // Add logging
            console.log('Navigating to signup page...');
            await page.goto('http://localhost:3000/signup', {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });
            console.log('Navigation completed');
        } catch (error) {
            console.error('Navigation failed:', error);
            throw error;
        }
    });

    test('should render signup form correctly', async ({ page }) => {
        // Check if logo is visible
        await expect(page.locator('img[alt="Logo"]')).toBeVisible();

        // Check toggle buttons
        const signupButton = page.locator('button:has-text("ثبت نام")');
        const loginButton = page.locator('button:has-text("ورود")');
        await expect(signupButton).toBeVisible();
        await expect(loginButton).toBeVisible();
        await expect(signupButton).toHaveClass(/active/);

        // Check form fields
        await expect(page.locator('input[placeholder="نام کاربری"]')).toBeVisible();
        await expect(page.locator('input[placeholder="ایمیل"]')).toBeVisible();
        await expect(page.locator('input[placeholder="رمز عبور"]')).toBeVisible();
        await expect(page.locator('input[placeholder="تکرار رمز عبور"]')).toBeVisible();

        // Check Google button
        await expect(page.locator('button:has-text("Google")')).toBeVisible();

        // Check submit button
        await expect(page.locator('button:has-text("ادامه")')).toBeVisible();
    });

    test('should toggle between login and signup forms', async ({ page }) => {
        // Initially in signup mode
        await expect(page.locator('input[placeholder="نام کاربری"]')).toBeVisible();

        await page.click('button:has-text("ورود")');
        await expect(page.locator('input[placeholder="نام کاربری"]')).not.toBeVisible();
        await expect(page.locator('a:has-text("رمز عبور خود را فراموش کردم")')).toBeVisible();

        // Switch back to signup mode
        await page.click('button:has-text("ثبت نام")');
        await expect(page.locator('input[placeholder="نام کاربری"]')).toBeVisible();
    });

    test('should show/hide password when eye icon is clicked', async ({ page }) => {
        const passwordInput = page.locator('input[placeholder="رمز عبور"]');
        const eyeIcon = page.locator('input[placeholder="رمز عبور"] + span >> img[alt="Eye Icon"]');

        // Password should be hidden by default
        await expect(passwordInput).toHaveAttribute('type', 'password');

        await eyeIcon.waitFor();
        await eyeIcon.click();
        await expect(passwordInput).toHaveAttribute('type', 'text');

        // Click to hide password again
        await eyeIcon.click();
        await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('should show error when required fields are empty', async ({ page }) => {
        await page.click('button:has-text("ثبت نام")');
        await page.click('button:has-text("ادامه")');

        // Check error message
        const errorText = page.locator('.errorText, [class*="error"], p.errorText');
        await errorText.waitFor({ state: 'visible', timeout: 10000 });
        await expect(errorText).toHaveText('همه فیلدها را پر کنید');
    });

    test('should show error when passwords do not match', async ({ page }) => {
        // Fill form with mismatched passwords
        await page.fill('input[placeholder="نام کاربری"]', 'testuser');
        await page.fill('input[placeholder="ایمیل"]', 'test@example.com');
        await page.fill('input[placeholder="رمز عبور"]', 'password123');
        await page.fill('input[placeholder="تکرار رمز عبور"]', 'differentpassword');

        // Submit form
        await page.click('button:has-text("ادامه")');

        const errorText = page.locator('.errorText, [class*="error"], p.errorText');
        await errorText.waitFor({ state: 'visible', timeout: 10000 });
        await expect(errorText).toHaveText('رمز عبور و تکرار آن مطابقت ندارند'  , { timeout: 10000 });
    });

    test('should navigate to verify page after successful signup', async ({ page }) => {
        // Mock API response
        await page.route('**/api/auth/register', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({})
            });
        });

        // Fill form with valid data
        await page.fill('input[placeholder="نام کاربری"]', 'testuser');
        await page.fill('input[placeholder="ایمیل"]', 'test@example.com');
        await page.fill('input[placeholder="رمز عبور"]', 'password123');
        await page.fill('input[placeholder="تکرار رمز عبور"]', 'password123');

        // Submit form
        await page.click('button:has-text("ادامه")');

        // Check navigation
        await page.waitForURL('**/verify');
        expect(page.url()).toContain('/verify');
    });

    test('should show error when email is already registered', async ({ page }) => {
        // Mock API response for existing user
        await page.route('**/api/auth/register', route => {
            route.fulfill({
                status: 400,
                contentType: 'application/json',
                body: JSON.stringify({ message: 'User already exists' })
            });
        });

        // Fill form with valid data
        await page.fill('input[placeholder="نام کاربری"]', 'existinguser');
        await page.fill('input[placeholder="ایمیل"]', 'existing@example.com');
        await page.fill('input[placeholder="رمز عبور"]', 'password123');
        await page.fill('input[placeholder="تکرار رمز عبور"]', 'password123');

        // Submit form
        await page.click('button:has-text("ادامه")');

        // Check error message
        const errorText = page.locator('.errorText, [class*="error"], p.errorText');
        await errorText.waitFor({ state: 'visible', timeout: 10000 });
    });

    test('should successfully login with valid credentials', async ({ page }) => {
        // Switch to login mode
        await page.click('button:has-text("ورود")');

        // Mock API response
        await page.route('**/api/auth/login', route => {
            route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({
                    token: 'mock-token',
                    user: { id: 1, name: 'testuser', email: 'test@example.com' }
                })
            });
        });

        // Fill login form
        await page.fill('input[placeholder="ایمیل"]', 'test@example.com');
        await page.fill('input[placeholder="رمز عبور"]', 'password123');

        // Submit form
        await page.click('button:has-text("ادامه")');

        // Check navigation to homepage
        await page.waitForURL('**/Homepage');
        expect(page.url()).toContain('/Homepage');
    });

    test('should show error for wrong password in login', async ({ page }) => {
        // Switch to login mode
        await page.click('button:has-text("ورود")');
        await page.waitForSelector('input[placeholder="رمز عبور"]'); // Ensure login form loaded

        // Mock API response for wrong password
        await page.route('**/api/auth/login', route => {
            route.fulfill({
                status: 400,
                contentType: 'application/json',
                body: JSON.stringify({ message: 'Wrong password' })
            });
        });

        // Fill login form
        await page.fill('input[placeholder="ایمیل"]', 'test@example.com');
        await page.fill('input[placeholder="رمز عبور"]', 'wrongpassword');

        // Submit form
        await page.click('button:has-text("ادامه")');

        // Check error message
        const errorText = page.locator('.errorText, [class*="error"], p.errorText');
        await errorText.waitFor({ state: 'visible', timeout: 10000 });
        await expect(errorText).toHaveText('رمز عبور اشتباه است');
    });
});