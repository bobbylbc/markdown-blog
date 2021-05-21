/* eslint-disable max-classes-per-file */
import BaseClass from '../baseClass'

class TestClass extends BaseClass {
	constructor(id) {
		super()
		this.id = id

		this.setDefinedKeys()
	}
}

class MasterTestClass extends BaseClass {
	constructor(course, courseName, test) {
		super()
		this.course = course
		this.courseName = courseName
		this.test = new TestClass().construct(test)
		this.setDefinedKeys()
	}

	fromJson(data) {
		super.fromJson(data)
		this.test = new TestClass().construct(this.test)
	}
}

class GrandMasterTestClass extends BaseClass {
	constructor(category, masterTest) {
		super()
		this.category = category
		this.masterTest = new MasterTestClass().construct(masterTest)
		this.setDefinedKeys()
	}

	fromJson(data) {
		super.fromJson(data)
		this.masterTest = new MasterTestClass().construct(this.masterTest)
	}
}

const sampleGrandMasterTestJson = {
	category: 'MyCat',
	masterTest: {
		course: 'I am MasterClass',
		courseName: 'Master Course',
		test: { id: 'Its the TestClass' }
	}
}

describe('Extending from BaseClass', () => {
	it('TestClass construct using arguments', () => {
		const base = new TestClass('12345')

		expect(base instanceof TestClass).toBe(true)
	})

	it('GrandMasterTestClass construct using arguments', () => {
		const base = new GrandMasterTestClass('MyCat', {
			course: 'I am MasterClass',
			courseName: 'Master Course',
			test: { id: 'Its the TestClass' }
		})

		expect(base.masterTest instanceof MasterTestClass).toBe(true)
		expect(base.masterTest.test instanceof TestClass).toBe(true)
		expect(base.toJson()).toEqual({
			category: 'MyCat',
			masterTest: {
				course: 'I am MasterClass',
				courseName: 'Master Course',
				test: { id: 'Its the TestClass' }
			}
		})
	})

	it('delete declared field => throw error', () => {
		const base = new TestClass()

		expect.assertions(1)
		try {
			base.id = '5555'
			delete base.id
		} catch (err) {
			expect(err.message).toBe("Cannot delete property 'id' of #<TestClass>")
		}
	})

	describe('get', () => {
		it('get declared fields that has data', () => {
			const base = new TestClass('12345')

			expect(base.id).toBe('12345')
		})

		it('get undeclared field => return undefined', () => {
			const base = new TestClass('12345')

			expect.assertions(1)

			expect(base.weight).toBeUndefined()
		})
	})

	describe('set', () => {
		it('set declared field, no error thrown', () => {
			const base = new TestClass()

			base.id = '5555'
			expect(base.id).toBe('5555')
		})

		it('set undeclared field => throw Error', () => {
			const base = new TestClass('12345')

			expect.assertions(1)

			try {
				base.height = 118
			} catch (err) {
				expect(err.message).toEqual('Cannot add property height, object is not extensible')
			}
		})
	})

	describe('toJson', () => {
		it('return a clone json representation of the class', () => {
			const base = new GrandMasterTestClass()
			base.fromJson(sampleGrandMasterTestJson)

			expect(base.toJson()).toMatchObject(sampleGrandMasterTestJson)
		})
	})

	describe('toStringify', () => {
		it('return a stringify json representation of the class', () => {
			const base = new GrandMasterTestClass()
			base.fromJson(sampleGrandMasterTestJson)

			expect(base.toStringify()).toMatch(JSON.stringify(sampleGrandMasterTestJson))
		})
	})

	describe('fromJson', () => {
		it('assign declared fields from whatever is available from json object', () => {
			const base = new TestClass()

			expect(base.toJson()).toEqual({})
			base.fromJson({ id: '87261', love: '12345', death: 'doood' })
			expect(base.toJson()).toEqual({ id: '87261' })
		})

		it(`Recursive inner class assignment
		GrandMasterTestClass will have instanceof MasterTestClass and MasterTestClass will have instanceof TestClass`, () => {
			const base = new GrandMasterTestClass()

			base.fromJson(sampleGrandMasterTestJson)

			expect(base.masterTest instanceof MasterTestClass).toBe(true)
			expect(base.masterTest.test instanceof TestClass).toBe(true)
		})
	})

	describe('construct', () => {
		it('if empty, return a empty class', () => {
			const base = new MasterTestClass().construct()
			expect(base.toJson()).toMatchInlineSnapshot(`
			Object {
			  "course": undefined,
			  "courseName": undefined,
			  "test": Object {
			    "id": undefined,
			  },
			}
		`)
		})

		it('if pass in json data, return a assigned class', () => {
			const base = new MasterTestClass().construct({ course: 'My Course', test: { id: '123' } })
			expect(base.test instanceof TestClass).toBe(true)
			expect(base.toJson()).toMatchInlineSnapshot(`
			Object {
			  "course": "My Course",
			  "courseName": undefined,
			  "test": Object {
			    "id": "123",
			  },
			}
		`)
		})
	})

	describe('getDefinedKeys', () => {
		it('expect a copy of keys returned', () => {
			const base = new GrandMasterTestClass('category', ['course', '123'])

			expect(base.getDefinedKeys()).toMatchInlineSnapshot(`
					Object {
					  "category": "category",
					  "masterTest": Object {
					    "course": "course",
					    "courseName": "courseName",
					    "test": Object {
					      "id": "id",
					    },
					  },
					}
			`)
		})
	})
})
