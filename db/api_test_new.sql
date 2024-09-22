-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Sep 2024 pada 09.22
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_test_new`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `orderproducts`
--

CREATE TABLE `orderproducts` (
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `orderproducts`
--

INSERT INTO `orderproducts` (`orderId`, `productId`, `quantity`, `createdAt`, `updatedAt`) VALUES
(9, 2, 0, '2024-09-22 06:43:57', '2024-09-22 06:43:57'),
(9, 3, 0, '2024-09-22 06:43:57', '2024-09-22 06:43:57'),
(10, 2, 0, '2024-09-22 06:44:27', '2024-09-22 06:44:27'),
(10, 3, 0, '2024-09-22 06:44:27', '2024-09-22 06:44:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `createdAt`, `updatedAt`) VALUES
(6, '2024-09-22 06:37:25', '2024-09-22 06:37:25'),
(7, '2024-09-22 06:38:41', '2024-09-22 06:38:41'),
(8, '2024-09-22 06:42:12', '2024-09-22 06:42:12'),
(9, '2024-09-22 06:43:57', '2024-09-22 06:43:57'),
(10, '2024-09-22 06:44:27', '2024-09-22 06:44:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `sold` int(11) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `sold`, `createdAt`, `updatedAt`) VALUES
(1, 'Product A', 10000, 50, 0, '2024-09-22 13:21:55', '2024-09-22 13:21:55'),
(2, 'Product B', 15000, 24, 6, '2024-09-22 13:21:55', '2024-09-22 06:44:27'),
(3, 'Product C', 20000, 14, 6, '2024-09-22 13:21:55', '2024-09-22 06:44:27'),
(4, 'Smartphone X', 8000000, 50, 0, '2024-09-22 06:22:53', '2024-09-22 06:23:07');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `orderproducts`
--
ALTER TABLE `orderproducts`
  ADD PRIMARY KEY (`orderId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `orderproducts`
--
ALTER TABLE `orderproducts`
  ADD CONSTRAINT `orderproducts_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderproducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
