<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240216181245 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE detail_subject (detail_id INT NOT NULL, subject_id INT NOT NULL, INDEX IDX_9C01BEAFD8D003BB (detail_id), INDEX IDX_9C01BEAF23EDC87 (subject_id), PRIMARY KEY(detail_id, subject_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE detail_subject ADD CONSTRAINT FK_9C01BEAFD8D003BB FOREIGN KEY (detail_id) REFERENCES detail (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE detail_subject ADD CONSTRAINT FK_9C01BEAF23EDC87 FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE detail_subject DROP FOREIGN KEY FK_9C01BEAFD8D003BB');
        $this->addSql('ALTER TABLE detail_subject DROP FOREIGN KEY FK_9C01BEAF23EDC87');
        $this->addSql('DROP TABLE detail_subject');
    }
}
