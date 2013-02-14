class YouTube < Liquid::Tag

  def initialize(tagName, text, tokens)
    super
    @text = text
  end

  def render(context)
    
    if parts = @text.match(/(\w+.) (\d+) (\d+)/)
      id, width, height = parts[1].strip, parts[2].strip, parts[3].strip
    else
      raise "Problem detected with the Youtube tag paramters"
    end
    
    "<iframe src=\"http://www.youtube-nocookie.com/embed/#{id}\" width=\"#{width}\" height=\"#{height}\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>"
  end

  Liquid::Template.register_tag "youtube", self
end