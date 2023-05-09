class ticketManager {
    #events
    #error

    constructor(){
        this.#events = []
        this.#error = undefined
    }

    getEvents = () => this.#events

    getElementById = (id) => {
        const event = this.#events.find(item => item.id === id)
        if (!event) return 'Not Found'
        return event
    }

    #generateId  = () => {return (this.#events.length === 0) ? 1 : this.#events[this.#events.length-1].id + 1
    }

    #validateEvent = (name, price, description, img, category) => {
        if(!name || !price || !description || !img || !category){
            this.#error = `[${name}]: campos incompletos`
        }else{
            const found = this.#events.find(item => item.description === description)
            if (found) this.#error = `[${name}]: el codigo ya existe`
            else this.#error = undefined
        }
    }



    addEvent = (name, price, description, img, category ) => {
        this.#validateEvent(name, price, description, img, category)
        if (this.#error === undefined)
            this.#events.push({id: this.#generateId(), name, price, description, img, category})
        else 
            console.log(this.#error)
    }
}
const myTicketManager = new ticketManager()
myTicketManager.addEvent ('Mercurial',25000,'Botines Nike mercurial futbol 11','sin imagen', 'futbo 11')
myTicketManager.addEvent ('Tiempo','Botines Nike Tiempo futbol 5','sin imagen', 'futbo 5')
myTicketManager.addEvent ('Predator ',30000,'Botines Adidas predator futbol 7 ','sin imagen', 'futbo 7')
myTicketManager.addEvent ('Copa ',35000,'Botines Adidas Copa futbol 5 ','sin imagen',)
myTicketManager.addEvent ('Nemesis ',20000,'Botines Adidas Nemesis futbol 11 ','sin imagen', 'futbo 11')

console.log (myTicketManager.getEvents())
console.log (myTicketManager.getElementById(2))
console.log (myTicketManager.getElementById(4))
