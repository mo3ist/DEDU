from core.models import *
from accounts.models import *
from random import randint, choice

def populate_users():
	User.objects.create_superuser('admin@admin.com', 'admin')
	for i in range(20):
		user = User(email=f"user{randint(1, 100000)}@user.com")
		user.set_password("user")
		user.save()

def populate_resources(course):
	for i in range(10):
		user = choice(User.objects.all())
		mod = Mod.objects.create()
		s = Resource(
			title=f"resource title #{randint(1, 10000)}", 
			body=f"resource body #{randint(1, 10000)}", 
			user=user, 
			mod=mod,
			course=course
		)
		s.save()

def populate_summaries(course):
	for i in range(10):
		user = choice(User.objects.all())
		s = Summary(
			title=f"summary title #{randint(1, 10000)}", 
			body=f"summary body #{randint(1, 10000)}", 
			user=user,
			mod=Mod.objects.create(),
			course=course
		)
		s.save()
		
def populate_lectures(course):
	for i in range(18):
		user = choice(User.objects.all())
		mod = Mod.objects.create()
		s = Lecture(
			title=f"محاضرة رقم {i}", 
			body=f"lecture body #{i}", 
			# link=f"https://www.site{randint(1, 1000)}.com/", 
			user=user,
			mod=mod,
			course=course,
			lecture_type=choice(["LECTURE", "SECTION"])
		)
		s.save()
		
def populate_questions(course):
	for i in range(10):
		user = choice(User.objects.all())
		s = Question(
			title=f"question title #{randint(1, 10000)}", 
			body=f"question body #{randint(1, 10000)}", 
			user=user,
			mod=Mod.objects.create(),
			course=course,
		)
		s.save()

def populate_answers(course):
	for i in range(10):
		user = choice(User.objects.all())
		question = choice(Question.objects.all())
		s = Answer(
			title=f"answer title #{randint(1, 10000)}", 
			body=f"answer body #{randint(1, 10000)}", 
			question=question, 
			user=user,
			mod=Mod.objects.create(),
			course=course
		)
		s.save()
		
def populate_quizzes(course):
	for i in range(10):
		user = choice(User.objects.all())
		s = Quiz(
			title=f"quiz title #{randint(1, 10000)}", 
			a=f"{randint(1, 10000)}", 
			b=f"{randint(1, 10000)}", 
			c=f"{randint(1, 10000)}", 
			d=f"{randint(1, 10000)}", 
			answer=f"{randint(1, 10000)}", 
			user=user,
			mod=Mod.objects.create(),
			course=course
		)
		s.save()
		
def populate_tags(course):
	for x in range(20):
		user = choice(User.objects.all())
		tag = Tag.objects.create(
			title=f"tag #{x}", 
			body=f"tag body #{x}", 
			user=user,
			tag_type=choice([ Tag.TAG_TYPE.CONCEPT, Tag.TAG_TYPE.OTHER ]),
			mod=Mod.objects.create(),
			course=course
		)
		lst = [
			Resource, 
			Summary, 
			Quiz, 
			Lecture, 
			Question, 
			Answer
		]

		for i in range(5):
			ch = choice(lst)    
			choosen = choice(ch.objects.all())
			if tag not in choosen.tag_set.all():
				tag.contents.add(choosen)

	# weeks 
	lec_len = Lecture.objects.all().count()
	for i in range(lec_len-2):
		t = Tag.objects.create(
			title=f"Week {i}", 
			body=f"Week #{i}", 
			user=user,
			tag_type=Tag.TAG_TYPE.SYLLABUS,
			mod=Mod.objects.create(),
			course=course

		)
		t.contents.add(Lecture.objects.all()[i])

	# chapters
	for i in range(lec_len//2):
		t = Tag.objects.create(
			title=f"Chapter {i}", 
			body=f"Chapter #{i}", 
			user=user,
			tag_type=Tag.TAG_TYPE.CHAPTER,
			mod=Mod.objects.create(),
			course=course

		)
		t.contents.add(Lecture.objects.all()[i])
		if i < lec_len:
			t.contents.add(Lecture.objects.all()[i+1])

def populate_courses():
	user=User.objects.get(email='admin@admin.com')
	for i in ["FIRST_YEAR_AI", "FIRST_YEAR_GENERAL", "FIRST_YEAR_SE"]:
		c = Classification.objects.create(
			year=i,
			user=user
		)

	for i in range(12):
		from string import ascii_uppercase, digits
		c = Course.objects.create(
			title=f"كورس رقم {i}",
			description="العشوائية أو العشاوة (بالإنجليزية: Randomness)‏ كلمة مشتقة من فعل عَشُوَ وعَشَا عَشْوًا; وتعني من ساء بصره بالليل والنهار أو من أبصر بالنهار ولم يبصر في الليل. فالعشاوة هي سوء البصر ليلا ونهارا أو ليلا فقط. تستعمل هذه الكلمة في العلوم للتعبير عن انعدام الغرض والغاية",
			user=user,
			code="".join([choice(ascii_uppercase + digits) for x in range(5)]),
			outline="""### Course
- Introduction
- What is this all about
- Real stuff
- First experiment
- Second one
- Theory
- Proof of first experiment

			"""
		)

		choice(Classification.objects.all()).courses.add(c)

def populate_votes():
	for lecture in Lecture.objects.all():
		v = Vote.objects.create(
			value="UPVOTE",
			content_object=lecture,
			user=choice(User.objects.all())
		)
		

def populate_attachments():
	for lecture in Lecture.objects.all():
		a = Attachment.objects.create(
			attm_type="IMAGE",
			title="TEST",
			user=User.objects.all()[0],
			content_object=lecture
		)

populate_users()
populate_courses()

courses = Course.objects.all()
for course in courses:
	populate_lectures(course)
	populate_questions(course)
	populate_answers(course)
	populate_resources(course)
	populate_summaries(course)
	populate_quizzes(course)
	populate_votes()
	populate_tags(course)
	populate_attachments()