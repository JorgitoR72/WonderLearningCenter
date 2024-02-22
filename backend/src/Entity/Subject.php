<?php

namespace App\Entity;

use App\Repository\SubjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SubjectRepository::class)]
class Subject
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\Column(length: 25)]
    private ?string $level = null;

    #[ORM\ManyToMany(targetEntity: Detail::class, mappedBy: 'subjects')]
    private Collection $students;

    #[ORM\OneToMany(targetEntity: Lesson::class, mappedBy: 'subject')]
    private Collection $lessons;

    #[ORM\OneToMany(targetEntity: File::class, mappedBy: 'subject', cascade: ['persist', 'remove'])]
    private Collection $files;


    public function __construct()
    {
        $this->students = new ArrayCollection();
        $this->lessons = new ArrayCollection();
        $this->files = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getLevel(): ?string
    {
        return $this->level;
    }

    public function setLevel(string $level): static
    {
        $this->level = $level;

        return $this;
    }

    /**
     * @return Collection<int, Detail>
     */
    public function getStudents(): Collection
    {
        return $this->students;
    }

    public function addStudent(Detail $student): static
    {
        if (!$this->students->contains($student)) {
            $this->students->add($student);
            $student->addSubject($this);
        }

        return $this;
    }

    public function removeStudent(Detail $student): static
    {
        if ($this->students->removeElement($student)) {
            $student->removeSubject($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Lesson>
     */
    public function getLessons(): Collection
    {
        return $this->lessons;
    }

    public function addLesson(Lesson $lesson): static
    {
        if (!$this->lessons->contains($lesson)) {
            $this->lessons->add($lesson);
            $lesson->setSubject($this);
        }

        return $this;
    }

    public function removeLesson(Lesson $lesson): static
    {
        if ($this->lessons->removeElement($lesson)) {
            // set the owning side to null (unless already changed)
            if ($lesson->getSubject() === $this) {
                $lesson->setSubject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, File>
     */
    public function getFiles(): Collection
    {
        return $this->files;
    }

    public function addFile(File $file): static
    {
        if (!$this->files->contains($file)) {
            $this->files->add($file);
            $file->setSubject($this);
        }

        return $this;
    }

    public function removeFile(File $file): static
    {
        if ($this->files->removeElement($file)) {
            // set the owning side to null (unless already changed)
            if ($file->getSubject() === $this) {
                $file->setSubject(null);
            }
        }

        return $this;
    }
}
