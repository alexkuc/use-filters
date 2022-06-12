class Item {
  id: number;
  title: string;
  description: string;
  instructor: string;
  starTime: Date;
  language: string;
  level: string;

  constructor({
    id,
    title,
    description,
    instructor,
    startTime,
    language,
    level,
  }: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    startTime: Date;
    language: string;
    level: string;
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.instructor = instructor;
    this.starTime = startTime;
    this.language = language;
    this.level = level;
  }
}

export { Item };
