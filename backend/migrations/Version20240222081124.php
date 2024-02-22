<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240222081124 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE subject_file DROP FOREIGN KEY FK_1E55B2CB23EDC87');
        $this->addSql('ALTER TABLE subject_file DROP FOREIGN KEY FK_1E55B2CB93CB796C');
        $this->addSql('DROP TABLE subject_file');
        $this->addSql('ALTER TABLE file ADD subject_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE file ADD CONSTRAINT FK_8C9F361023EDC87 FOREIGN KEY (subject_id) REFERENCES subject (id)');
        $this->addSql('CREATE INDEX IDX_8C9F361023EDC87 ON file (subject_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE subject_file (subject_id INT NOT NULL, file_id INT NOT NULL, INDEX IDX_1E55B2CB93CB796C (file_id), INDEX IDX_1E55B2CB23EDC87 (subject_id), PRIMARY KEY(subject_id, file_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE subject_file ADD CONSTRAINT FK_1E55B2CB23EDC87 FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE subject_file ADD CONSTRAINT FK_1E55B2CB93CB796C FOREIGN KEY (file_id) REFERENCES file (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE file DROP FOREIGN KEY FK_8C9F361023EDC87');
        $this->addSql('DROP INDEX IDX_8C9F361023EDC87 ON file');
        $this->addSql('ALTER TABLE file DROP subject_id');
    }
}
