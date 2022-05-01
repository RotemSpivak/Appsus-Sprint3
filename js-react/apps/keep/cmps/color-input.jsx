export function ColorInput({handleStyleChange, isShown}){
    const colors =['#fff','#B4FF9F', '#F9FFA4', '#FFD59E', '#CCF2F4', '#CFDAC8', '#D3E4CD', '#CCEDD2', '#E4E9BE', '#F2DDC1']

    return <section className={`input-color-container ${!isShown ? 'hidden' : ''}`} >
        <div className="color-input" >
            {colors.map(color => <div className="item" key={color}
            style={{backgroundColor: color}}
            onClick={() => handleStyleChange(color)}>
            </div>)}
        </div>
    </section>
}