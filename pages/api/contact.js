export default async function ContactApi(req, res) {
    const {name, email} = req.body
    //do some validaion probably

    const data = {
        name, email
    }

    return res.status(200).json({message: "success"})
}


/** <div className="w-full flex flex-col">
                    <label className="font-bold text-gray-800" htmlFor="zodiac">Zodiac Sign</label>
                    <select id="zodiac">
                        <option value="aries">Aries</option>
                        <option value="taurus">Taurus</option>
                        <option value="gemini">Gemini</option>
                        <option value="cancer">Cancer</option>
                        <option value="leo">Leo</option>
                        <option value="virgo">Virgo</option>
                        <option value="libra">Libra</option>
                        <option value="scorpio">Scorpio</option>
                        <option value="sagittarius">Sagittarius</option>
                        <option value="capricorn">Capricorn</option>
                        <option value="aquarius">Aquarius</option>
                        <option value="pisces">Pisces</option>
                    </select>
                </div> */