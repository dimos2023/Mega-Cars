<?php
declare(strict_types=1);

/**
 * Centralised MySQL connection + lightweight schema bootstrap for registrations.
 * Defaults target the local Laragon stack (`root` with no password).
 * Override via environment variables: DB_HOST, DB_NAME, DB_USER, DB_PASS.
 */
function qm_pdo(): PDO
{
    static $pdo;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $dbName = getenv('DB_NAME') ?: 'quantum_motors';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') ?: '';
    $charset = 'utf8mb4';

    $dsn = "mysql:host={$host};charset={$charset}";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    $pdo = new PDO($dsn, $user, $pass, $options);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET {$charset} COLLATE {$charset}_unicode_ci");
    $pdo->exec("USE `{$dbName}`");
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS registrations (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(190) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            role VARCHAR(120) NOT NULL,
            company VARCHAR(160) NOT NULL,
            address TEXT NOT NULL,
            linkedin_url VARCHAR(255) NOT NULL,
            current_type VARCHAR(60) NOT NULL,
            current_brand VARCHAR(60) NOT NULL,
            desired_model VARCHAR(60) NOT NULL,
            payment_method VARCHAR(80) NOT NULL,
            notes TEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET={$charset} COLLATE {$charset}_unicode_ci;
    ");
    // In case the table already existed before this field was added.
    $pdo->exec("ALTER TABLE registrations ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255) NOT NULL DEFAULT '' AFTER address");

    return $pdo;
}

function qm_store_registration(array $data): int
{
    $pdo = qm_pdo();
    $stmt = $pdo->prepare('
        INSERT INTO registrations (
            email, phone, role, company, address, linkedin_url,
            current_type, current_brand, desired_model, payment_method, notes
        )
        VALUES (
            :email, :phone, :role, :company, :address, :linkedin_url,
            :current_type, :current_brand, :desired_model, :payment_method, :notes
        )
    ');

    $stmt->execute([
        ':email' => $data['email'],
        ':phone' => $data['phone'],
        ':role' => $data['role'],
        ':company' => $data['company'],
        ':address' => $data['address'],
        ':linkedin_url' => $data['linkedin_url'],
        ':current_type' => $data['current_type'],
        ':current_brand' => $data['current_brand'],
        ':desired_model' => $data['desired_model'],
        ':payment_method' => $data['payment_method'],
        ':notes' => $data['notes'] !== '' ? $data['notes'] : null,
    ]);

    return (int)$pdo->lastInsertId();
}
