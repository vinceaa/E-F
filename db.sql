-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-05-23 13:21:22
-- 服务器版本： 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finddream`
--

-- --------------------------------------------------------

--
-- 表的结构 `collection`
--

CREATE TABLE `collection` (
  `collection_id` int(12) NOT NULL,
  `user_id` int(8) NOT NULL,
  `collection_type` char(1) COLLATE utf8_bin NOT NULL,
  `from_cid` int(12) NOT NULL,
  `collection_title` varchar(50) COLLATE utf8_bin NOT NULL,
  `collection_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(12) NOT NULL,
  `from_uid` int(8) NOT NULL,
  `to_id` int(12) NOT NULL,
  `to_type` char(1) COLLATE utf8_bin NOT NULL,
  `comment_content` text COLLATE utf8_bin NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `creation`
--

CREATE TABLE `creation` (
  `creation_id` int(12) NOT NULL,
  `user_id` int(8) NOT NULL,
  `creation_title` varchar(50) COLLATE utf8_bin NOT NULL,
  `creation_content` text COLLATE utf8_bin NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `experience`
--

CREATE TABLE `experience` (
  `experience_id` int(12) NOT NULL,
  `user_id` int(8) NOT NULL,
  `experience_title` varchar(50) COLLATE utf8_bin NOT NULL,
  `experience_content` text COLLATE utf8_bin NOT NULL,
  `experience_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `history`
--

CREATE TABLE `history` (
  `history_id` int(12) NOT NULL,
  `user_id` int(8) NOT NULL,
  `history_word` varchar(80) COLLATE utf8_bin NOT NULL,
  `history_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `note`
--

CREATE TABLE `note` (
  `note_id` int(12) NOT NULL,
  `user_id` int(8) NOT NULL,
  `note_type` char(1) COLLATE utf8_bin NOT NULL,
  `note_title` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `note_content` text COLLATE utf8_bin NOT NULL,
  `note_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `note_status` char(1) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `picture`
--

CREATE TABLE `picture` (
  `picture_id` int(20) NOT NULL,
  `picture_src` varchar(80) COLLATE utf8_bin NOT NULL,
  `from_type` char(1) COLLATE utf8_bin NOT NULL,
  `from_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `record`
--

CREATE TABLE `record` (
  `record_id` int(12) NOT NULL,
  `record_src` varchar(80) COLLATE utf8_bin NOT NULL,
  `from_uid` int(8) NOT NULL,
  `to_word` varchar(80) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `reply`
--

CREATE TABLE `reply` (
  `reply_id` int(12) NOT NULL,
  `from_uid` int(8) NOT NULL,
  `to_id` int(12) NOT NULL,
  `to_type` char(1) COLLATE utf8_bin NOT NULL,
  `reply_content` text COLLATE utf8_bin NOT NULL,
  `reply_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `thumb`
--

CREATE TABLE `thumb` (
  `thumb_id` int(12) NOT NULL,
  `from_uid` int(8) NOT NULL,
  `to_id` int(12) NOT NULL,
  `to_type` char(1) COLLATE utf8_bin NOT NULL,
  `thumb_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `topic`
--

CREATE TABLE `topic` (
  `topic_id` int(12) NOT NULL,
  `user_id` int(8) NOT NULL,
  `topic_title` varchar(50) COLLATE utf8_bin NOT NULL,
  `topic_content` text COLLATE utf8_bin NOT NULL,
  `topic_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` int(8) NOT NULL,
  `openid` char(28) COLLATE utf8_bin NOT NULL,
  `nickname` varchar(40) COLLATE utf8_bin NOT NULL,
  `avatar` varchar(256) COLLATE utf8_bin NOT NULL,
  `credit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `word_user`
--

CREATE TABLE `word_user` (
  `wu_id` int(12) NOT NULL,
  `word` varchar(80) COLLATE utf8_bin NOT NULL,
  `user_id` int(8) NOT NULL,
  `wu_type` char(1) COLLATE utf8_bin NOT NULL,
  `wu_content` text COLLATE utf8_bin NOT NULL,
  `wu_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`collection_id`,`user_id`),
  ADD KEY `fk_uid` (`user_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `fk_comment` (`from_uid`) USING BTREE;

--
-- Indexes for table `creation`
--
ALTER TABLE `creation`
  ADD PRIMARY KEY (`creation_id`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`experience_id`),
  ADD KEY `fk_experience` (`user_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`note_id`);

--
-- Indexes for table `picture`
--
ALTER TABLE `picture`
  ADD PRIMARY KEY (`picture_id`);

--
-- Indexes for table `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `fk_record` (`from_uid`);

--
-- Indexes for table `reply`
--
ALTER TABLE `reply`
  ADD PRIMARY KEY (`reply_id`);

--
-- Indexes for table `thumb`
--
ALTER TABLE `thumb`
  ADD PRIMARY KEY (`thumb_id`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`topic_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `u_openid` (`openid`);

--
-- Indexes for table `word_user`
--
ALTER TABLE `word_user`
  ADD PRIMARY KEY (`wu_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(12) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `creation`
--
ALTER TABLE `creation`
  MODIFY `creation_id` int(12) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `experience`
--
ALTER TABLE `experience`
  MODIFY `experience_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(12) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `note`
--
ALTER TABLE `note`
  MODIFY `note_id` int(12) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `picture`
--
ALTER TABLE `picture`
  MODIFY `picture_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `record`
--
ALTER TABLE `record`
  MODIFY `record_id` int(12) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `reply`
--
ALTER TABLE `reply`
  MODIFY `reply_id` int(12) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `thumb`
--
ALTER TABLE `thumb`
  MODIFY `thumb_id` int(12) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `topic`
--
ALTER TABLE `topic`
  MODIFY `topic_id` int(12) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `word_user`
--
ALTER TABLE `word_user`
  MODIFY `wu_id` int(12) NOT NULL AUTO_INCREMENT;

--
-- 限制导出的表
--

--
-- 限制表 `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `fk_uid` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- 限制表 `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_creat` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_creation` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_history` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_note` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_reply` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_thumb` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_topic` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_wu` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`);

--
-- 限制表 `experience`
--
ALTER TABLE `experience`
  ADD CONSTRAINT `fk_experience` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- 限制表 `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `fk_record` FOREIGN KEY (`from_uid`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
