describe "ProcessingJS", ->

  beforeEach(->
    $(".processingjs").remove()
  )

  afterEach(->
    $(".processingjs").remove()
  )

  it("handles manual instantiation", ->
    
    el = $("""
<pre data-code-language="processingjs">
void setup() {
  size(200,200);
}
</pre>""")

    $("body").append(el)
    pjs = new atlasplugins.ProcessingJS(el[0])
    expect($('.processingjs').length).toEqual(1)
  )