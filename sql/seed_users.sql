-- Seed admin user
-- Default password is: admin123
-- This is the bcrypt hash for 'admin123'
INSERT INTO users (name, email, password, role)
VALUES (
    'Admin User',
    'admin@roosly.com',
    '$2a$10$rGHvQqZcHDx4LmFVJv1MdOxZ5qR5LxKtW3mKyW8M5HqJ5JqC5JqC5', -- admin123
    'admin'
)
ON CONFLICT (email) DO NOTHING;

-- You can add more test users here if needed
-- INSERT INTO users (name, email, password, role)
-- VALUES (
--     'Regular User',
--     'user@roosly.com',
--     '$2a$10$rGHvQqZcHDx4LmFVJv1MdOxZ5qR5LxKtW3mKyW8M5HqJ5JqC5JqC5',
--     'user'
-- );
