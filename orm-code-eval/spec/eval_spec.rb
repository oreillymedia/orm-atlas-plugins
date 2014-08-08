require File.expand_path '../spec_helper.rb', __FILE__

describe "/eval" do

  it "works" do
    post '/eval', {
      html_string: "<p>I feel good</p>",
      js_string: "console.log('hello')",
      js_libs: ["https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.2.22/p5.min.js"]
    }
    expect(last_response.status).to be(200)
    expect(last_response.body).to eq("<html>
<head>
  <title></title>
  
  <script type=\"text/javascript\" src=\"https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.2.22/p5.min.js\"></script>
  
  <script type=\"text/javascript\">
    console.log('hello')
  </script>
</head>
<body>
  <p>I feel good</p>
</body>
</html>")
  end

end